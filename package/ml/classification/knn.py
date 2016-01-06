from sklearn.neighbors import KNeighborsClassifier
from ml.classification.base import Classifier


class KNNClassifier(Classifier):

    def __init__(self):
        Classifier.__init__(self)
        self._name = "KNN"
        self._model = KNeighborsClassifier(n_neighbors=3)
