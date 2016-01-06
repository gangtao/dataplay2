import uuid


class BaseModel(object):

    def __init__(self):
        # Generate an random UUID to reference this model
        self._uuid = str(uuid.uuid4())
        self._name = None

    # train the model with given data set
    def train(self, data):
        pass

    # train the model with given data set
    def getParameterDef(self):
        pass

    def setParameter(self, parameter):
        pass

    # predict the model with given dataset
    def predict(self, data):
        pass

    def getId(self):
        return self._uuid

    def getName(self):
        return self._name
