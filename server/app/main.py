from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

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
    password = db.Column(db.String(255))

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
    reqJson = request.get_json()

    clientFirstName = reqJson['firstName']
    clientLastName = reqJson['lastName']
    clientAddress = reqJson['address']
    clientPhoneNum = reqJson['phoneNum']
    clientEmail = reqJson['email']
    clientPassword = reqJson['password']

    client = Client(clientFirstName, clientLastName, clientAddress, clientPhoneNum, clientEmail, clientPassword)

    db.session.add(client)
    db.session.commit()

    response = {'status': 1}

    return jsonify(response)

@app.route('/driverSignUp', methods=['POST'])
def driverSignUpView():
    reqJson = request.get_json()

    driverFirstName = reqJson['firstName']
    driverLastName = reqJson['lastName']
    driverAddress = reqJson['address']
    driverPhoneNum = reqJson['phoneNum']
    driverEmail = reqJson['email']
    driverPassword = reqJson['password']

    driver = Driver(driverFirstName, driverLastName, driverAddress, driverPhoneNum, driverEmail, driverPassword)

    db.session.add(driver)
    db.session.commit()

    response = {'status': 1}
    return jsonify(response) 

@app.route('/addPrescription')
def addPrescriptionView():
    reqJson = request.get_json()

    currPrescriptionUserId = reqJson['id']
    currPrescriptionName = reqJson['name']
    currPrescriptionDose = reqJson['dose']
    currPrescriptionReps = reqJson['reps']
    currPrescriptionNumber = reqJson['number']

    prescription = Prescription(currPrescriptionUserId, currPrescriptionName, currPrescriptionDose, currPrescriptionReps, currPrescriptionNumber)

    db.session.add(prescription)
    db.session.commit()
