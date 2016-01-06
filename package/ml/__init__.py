
from ml.classification import getClassifierByName, getClassifierNames
from ml.regression import getRegressionByName, getRegressionModels
from ml.cluster import getClusterByName, getClusterModels


_models = dict()


def createModel(type, name):
    model = None
    if type == "Classification":
        model = getClassifierByName(name)
        _models[model.getId()] = model
    elif type == "Regression":
        model = getRegressionByName(name)
        _models[model.getId()] = model
    elif type == "Cluster":
        model = getClusterByName(name)
        _models[model.getId()] = model

    return model


def getModel(id):
    return _models[id]


def getModelType(type):
    if type == "Classification":
        return getClassifierNames()
    elif type == "Regression":
        return getRegressionModels()
    elif type == "Cluster":
        return getClusterModels()
