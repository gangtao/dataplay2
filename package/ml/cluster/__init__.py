from ml.cluster import kmeans

__CATEGORY__ = ["KMeans"]


def getClusterByName(name):
    if name == "KMeans":
        return kmeans.KMeansCluster()

    return None


def getClusterModels():
    return __CATEGORY__
