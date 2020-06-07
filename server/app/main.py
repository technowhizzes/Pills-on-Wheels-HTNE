from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

class Config(object):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'

app = Flask(__name__)
app.config.from_object(Config())
db = SQLAlchemy(app)

#DATABASE MODELS
class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phoneNum = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, firstName, lastName, address, phoneNum, email, password):
        self.firstName = firstName
        self.lastName = lastName
        self.address = address
        self.phoneNum = phoneNum
        self.email = email
        self.password = password

class Driver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phoneNum = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    deliveries = db.Column(db.Integer, default=0)
    paypalEmail = db.Column(db.String(255), nullable=False)

    def __init__(self, firstName, lastName, address, phoneNum, email, password, paypalEmail):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.address = address
        self.phoneNum = phoneNum
        self.password = password
        self.paypalEmail = paypalEmail

class Prescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    clientId = db.Column(db.Integer, db.ForeignKey('client.id'))
    prescribingDoctor = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    dose = db.Column(db.String(255), nullable=False)
    reps = db.Column(db.Integer, default=0)
    number = db.Column(db.String(255), nullable=False)

    def __init__(self, clientId, doctor, name, dose, reps, number):
        self.clientId = clientId
        self.prescribingDoctor = doctor
        self.name = name
        self.dose = dose
        self.reps = reps
        self.number = number
        
class AvailableDelivery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prescriptionId = db.Column(db.String(255), db.ForeignKey('prescription.id'))
    prescriptionNumber = db.Column(db.String(255), nullable=False)
    clientAddress = db.Column(db.String(255), nullable=False)
    pharmacyName = db.Column(db.String(255), nullable=False)
    pharmacyAddress = db.Column(db.String(255), nullable=False)

    def __init__(self, prescriptionId, prescriptionNumber, clientAddress, pharmacyName, pharmacyAddress):
        self.prescriptionId = prescriptionId
        self.prescriptionNumber = prescriptionNumber
        self.clientAddress = clientAddress
        self.pharmacyName = pharmacyName
        self.pharmacyAddress = pharmacyAddress

class ClaimedDelivery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driverId = db.Column(db.Integer, db.ForeignKey('driver.id'))
    prescriptionNumber = db.Column(db.String(255), nullable=False)
    clientAddress = db.Column(db.String(255), nullable=False)
    pharmacyName = db.Column(db.String(255), nullable=False)
    pharmacyAddress = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, driverId, prescriptionNumber, clientAddress, pharmacyName, pharmacyAddress):
        self.driverId = driverId
        self.prescriptionNumber = prescriptionNumber
        self.clientAddress = clientAddress
        self.pharmacyName = pharmacyName
        self.pharmacyAddress = pharmacyAddress

# GLOBAL FUNCTIONS
def makeJson(result):
    del result['_sa_instance_state']
    return result

# VIEWS
@app.route('/')
def homeView():
    return '<h1>Pills on Wheels API V3</h1>'

@app.route('/clientSignUp', methods=['POST'])
def clientSignUpView():
    try:
        reqJson = request.get_json()

        clientFirstName = reqJson['firstName'] if reqJson['firstName'] else None
        clientLastName = reqJson['lastName'] if reqJson['lastName'] else None
        clientAddress = reqJson['address'] if reqJson['address'] else None
        clientPhoneNum = reqJson['phoneNum'] if reqJson['phoneNum'] else None
        clientEmail = reqJson['email'] if reqJson['email'] else None
        clientPassword = generate_password_hash(reqJson['password'], method='sha256') if reqJson['password'] else None

        if (Client.query.filter_by(email=clientEmail).first() != None):
            response = {'status': 0, 'error': 'That email already exists in the database'}
            return jsonify(response)

    except:
        response = {'status': 0, 'error': 'Key error. The JSON passed in the request does not match the parameters'}
        return jsonify(response)

    try:
        client = Client(clientFirstName, clientLastName, clientAddress, clientPhoneNum, clientEmail, clientPassword)

        db.session.add(client)
        db.session.commit()
    
    except:
        response = {'status': 0, 'error': 'Database error. Check if one of the entered fields is null or empty'}
        return jsonify(response)

    response = {'status': 1}

    return jsonify(response)

@app.route('/clientLogin', methods=["POST"])
def clientLoginView():
    reqJson = request.get_json()

    client = Client.query.filter_by(email=reqJson['email']).first()

    if (client):
        if (check_password_hash(client.password, reqJson['password'])):
            response = {'status': 1, 'clientId': client.id}

        else:
            response = {'status': 0, 'error': 'Incorrect password'}

    else:
        response = {'status': 0, 'error': 'User does not exist'}

    return jsonify(response)

@app.route('/driverSignUp', methods=['POST'])
def driverSignUpView():
    try:
        reqJson = request.get_json()

        driverFirstName = reqJson['firstName'] if reqJson['firstName'] else None
        driverLastName = reqJson['lastName'] if reqJson['lastName'] else None 
        driverAddress = reqJson['address'] if reqJson['address'] else None
        driverPhoneNum = reqJson['phoneNum'] if reqJson['phoneNum'] else None
        driverEmail = reqJson['email'] if reqJson['email'] else None
        driverPassword = generate_password_hash(reqJson['password'], method='sha256') if reqJson['password'] else None
        driverPaypalEmail = reqJson['paypal'] if reqJson['paypal'] else None

        if (Driver.query.filter_by(email=driverEmail).first() != None):
            response = {'status': 0, 'error': 'That email already exists in the database'}
            return jsonify(response)

    except Exception as e:
        response = {'status': 0, 'error': 'Key error. The JSON passed in the request does not match the parameters', 'Exception': str(e)}
        return jsonify(response)

    try:
        driver = Driver(driverFirstName, driverLastName, driverAddress, driverPhoneNum, driverEmail, driverPassword, driverPaypalEmail)

        db.session.add(driver)
        db.session.commit()

    except:
        response = {'status': 0, 'error': 'Database error. Check if one of the entered fields is empty or null'}
        return jsonify(response)

    response = {'status': 1}
    return jsonify(response) 

@app.route('/driverLogin', methods=["POST"])
def driverLoginView():
    reqJson = request.get_json()

    driver = Driver.query.filter_by(email=reqJson["email"]).first()

    if (driver):
        if (check_password_hash(driver.password,reqJson["password"])):
            response = {'status': 1, 'driverId': driver.id}

        else:
            response = {'status': 0, 'error': 'Incorrect Password'}

    else:
        response = {'status': 0, 'error': 'User does not exist'}

    return jsonify(response)


@app.route('/addPrescription', methods=["POST"])
def addPrescriptionView():
    try:
        reqJson = request.get_json()

        currPrescriptionClientId = reqJson['id'] if reqJson['id'] else None
        currPrescriptionPrescribingDoctor = reqJson['doctor'] if reqJson['doctor'] else None
        currPrescriptionName = reqJson['name'] if reqJson['name'] else None
        currPrescriptionDose = reqJson['dose'] if reqJson['dose'] else None
        currPrescriptionReps = reqJson['reps'] if reqJson['reps'] else None
        currPrescriptionNumber = reqJson['number'] if reqJson['number'] else None
    
    except:
        response = {'status': 0, 'error': 'KeyError. The JSON passed in the request does not match the parameters'}
        return jsonify(response)

    try:
        prescription = Prescription(currPrescriptionClientId,currPrescriptionPrescribingDoctor, currPrescriptionName, currPrescriptionDose, currPrescriptionReps, currPrescriptionNumber)

        db.session.add(prescription)
        db.session.commit()
        response = {'status': 1}

    except:
        response = {'status': 0, 'error': 'Database error. Check if one of the fields passed is empty or null'}
        return jsonify(response)

    return jsonify(response)

@app.route('/getPrescriptions', methods=["POST"])
def getPrescriptionView():
    reqJson = request.get_json()

    try:
        currClientId = reqJson['id']
    
    except:
        response = {'status': 0, 'error': 'No Client Id specified'}
        return jsonify(response)

    else:
        clientPrescriptions = Prescription.query.filter_by(clientId=currClientId)

        clientPrescriptionsDict = {'status': 1, 'prescriptions': []}

        for clientPrescription in clientPrescriptions:
            clientPrescriptionsDict['prescriptions'].append(makeJson(dict(clientPrescription.__dict__)))

        return jsonify(clientPrescriptionsDict)

@app.route('/orderDelivery', methods=["POST"])
def orderDeliveryView():
    try:
        reqJson = request.get_json()

        currPrescriptionId = reqJson['prescriptionId']
        currDeliveryPharmacyName = reqJson['pharmacyName']
        currDeliveryPharmacyAddress = reqJson['pharmacyAddress']
        currPrescription = Prescription.query.filter_by(id=currPrescriptionId).first()
        currPrescriptionNumber = currPrescription.number
        currClient = Client.query.filter_by(id=currPrescription.clientId).first()
        currClientAddress = currClient.address

    except:
        response = {'status': 0, 'error': 'Invalid JSON key'}
        return jsonify(response)

    else:
        d = AvailableDelivery(currPrescriptionId, currPrescriptionNumber, currClientAddress, currDeliveryPharmacyName, currDeliveryPharmacyAddress)

        db.session.add(d)
        db.session.commit()

        response = {'status': 1}

        return jsonify(response)

@app.route('/claimDelivery', methods=["POST"])
def claimDeliveryView():
    try:
        reqJson = request.get_json()

        availableDeliveryId = reqJson['deliveryId']
        currDelivery = AvailableDelivery.query.filter_by(id=availableDeliveryId).first()

        currPharmacyName =  currDelivery.pharmacyName
        currPharmacyAddress = currDelivery.pharmacyAddress
        currPrescriptionId = currDelivery.prescriptionId

        currDriverId = reqJson['driverId'] if reqJson['driverId'] else None

        currPrescription = Prescription.query.filter_by(id=currPrescriptionId).first()
        currPrescriptionNumber = currPrescription.number
        currClient = Client.query.filter_by(id=currPrescription.clientId).first()
        currClientAddress = currClient.address


    except Exception as e:
        response = {'status': 0, 'error': 'Invalid JSON key', 'Exception': str(e)}
        return jsonify(response)

    else:
        d = ClaimedDelivery(currDriverId, currPrescriptionNumber, currClientAddress, currPharmacyName, currPharmacyAddress)
        ad = AvailableDelivery.query.filter_by(deliverId=availableDeliveryId)

        db.session.add(d)
        db.session.delete(ad)

        db.session.commit()

        response = {'status': 1}

        return response

@app.route('/claimedDeliveries')
def claimedDeliveriesView():
    reqJson = request.get_json()

    currDriverId = reqJson['driverId']

    currentDeliveries = ClaimedDelivery.query.filter_by(driverId=currDriverId).all()
    currentDeliveriesDict = {'status': 1, 'deliveries': []}

    for delivery in currentDeliveries:
        currentDeliveriesDict['deliveries'].append(makeJson(dict(delivery.__dict__)))

    return jsonify(currentDeliveriesDict)


@app.route('/availableDeliveries', methods=["GET", "POST"])
def availableDeliveriesView():
    ad = AvailableDelivery.query.all()
    deliveryDict = {'status': 1, 'deliveries': []}

    for delivery in ad:
        deliveryDict["deliveries"].append(makeJson(dict(delivery.__dict__)))

    return jsonify(deliveryDict)

@app.route('/clientAccountInfo', methods=["POST"])
def clientAccountView():
    reqJson = request.get_json()

    clientId = reqJson['id']

    return jsonify(makeJson(dict(Client.query.filter_by(id=clientId).first().__dict__)))

@app.route('/driverAccountInfo', methods=["POST"])
def driverAccountView():
    reqJson = request.get_json()

    driverId = reqJson['id']

    return jsonify(makeJson(dict(Driver.query.filter_by(id=driverId).first().__dict__)))

@app.route('/clients')
def clientsView():
    clients = Client.query.all()
    clientDict = {'clients': []}

    for client in clients:
        clientDict['clients'].append(makeJson(dict(client.__dict__)))

    return jsonify(clientDict)

@app.route('/drivers')
def driversView():
    drivers = Driver.query.all()
    driverDict = {'drivers': []}

    for client in drivers:
        driverDict['drivers'].append(makeJson(dict(client.__dict__)))

    return jsonify(driverDict)

@app.route('/pleb')
def plebView():
    return '<h1>Pleb</h1>'

