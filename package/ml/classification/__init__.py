
from ml.classification import knn, svm, bayes


__CLASSIFIER__ = ["KNN", "Bayes", "SVM"]


def getClassifierByName(name):
    if name == "KNN":
        return knn.KNNClassifier()
    elif name == "SVM":
        return svm.SVMClassifier()
    elif name == "Bayes":
        return bayes.NBayesClassifier()

    return None


def getClassifierNames():
    return __CLASSIFIER__
