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

    def __init__(self, firstName, lastName, address, phoneNum, email, password):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.address = address
        self.phoneNum = phoneNum
        self.password = password

class Prescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    clientId = db.Column(db.Integer, db.ForeignKey('client.id'))
    name = db.Column(db.String(255), nullable=False)
    dose = db.Column(db.String(255), nullable=False)
    reps = db.Column(db.Integer, default=0)
    number = db.Column(db.String(255), nullable=False)

    def __init__(self, clientId, name, dose, reps, number):
        self.clientId = clientId
        self.name = name
        self.dose = dose
        self.reps = reps
        self.number = number
        
class Delivery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driverId = db.Column(db.Integer, db.ForeignKey('driver.id'))
    prescriptionId = db.Column(db.Integer, db.ForeignKey('prescription.id'))
    pharmacyName = db.Column(db.String(255), nullable=False)
    pharmacyAddress = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, driverId, prescriptionId, pharmacyName, pharmacyAddress):
        self.driverId = driverId
        self.prescriptionId = prescriptionId
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

        if (Driver.query.filter_by(driverEmail).first() != None):
            response = {'status': 0, 'error': 'That email already exists in the database'}
            return jsonify(response)

    except Exception as e:
        response = {'status': 0, 'error': 'Key error. The JSON passed in the request does not match the parameters', 'Exception': str(e)}
        return jsonify(response)

    try:
        driver = Driver(driverFirstName, driverLastName, driverAddress, driverPhoneNum, driverEmail, driverPassword)

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

        currPrescriptionUserId = reqJson['id'] if reqJson['id'] else None
        currPrescriptionName = reqJson['name'] if reqJson['name'] else None
        currPrescriptionDose = reqJson['dose'] if reqJson['dose'] else None
        currPrescriptionReps = reqJson['reps'] if reqJson['reps'] else None
        currPrescriptionNumber = reqJson['number'] if reqJson['number'] else None
    
    except:
        response = {'status': 0, 'error': 'KeyError. The JSON passed in the request does not match the parameters'}
        return jsonify(response)

    try:
        prescription = Prescription(currPrescriptionUserId, currPrescriptionName, currPrescriptionDose, currPrescriptionReps, currPrescriptionNumber)

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

    currClientId = reqJson['id']

    clientPrescriptions = Prescription.query.all()

    clientPrescriptionsDict = {'prescriptions': []}

    for clientPrescription in clientPrescriptions:
        clientPrescriptionsDict['prescriptions'].append(makeJson(dict(clientPrescription.__dict__)))

    return jsonify(clientPrescriptionsDict)

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

