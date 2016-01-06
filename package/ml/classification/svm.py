from sklearn import svm
from ml.classification.base import Classifier


class SVMClassifier(Classifier):

    def __init__(self):
        Classifier.__init__(self)
        self._name = "SVM"
        self._model = svm.SVC()
