from sklearn.cluster import KMeans
from ml.cluster.base import Cluster


class KMeansCluster(Cluster):

    def __init__(self):
        Cluster.__init__(self)
        self._name = "KMeans"
        self._model = KMeans(n_clusters=3)

    # train the model with given data set
    def getParameterDef(self):
        pass

    def setParameter(self, parameter):
        pass
