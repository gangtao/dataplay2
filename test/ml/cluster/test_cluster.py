
import unittest as ut
import sys
sys.path.append("../../../package")

import ml.cluster


class TestCluster(ut.TestCase):

    def setUp(self):
        super(TestCluster, self).setUp()

    def test_kmeans(self):
        model = ml.cluster.getClusterByName("KMeans")
        data = dict()
        data["train"] = [
            [1, 2],
            [2, 1],
            [2, 4],
            [1, 3],
            [2, 2],
            [3, 1],
            [1, 1],

            [7, 3],
            [8, 2],
            [6, 4],
            [7, 4],
            [8, 1],
            [9, 2],

            [10, 8],
            [9, 10],
            [7, 8],
            [7, 9],
            [8, 11],
            [9, 9]
        ]

        model.train(data)
        print model.predict(data["train"])
        ##self.assertEquals(model.predict(data["train"]), [5.5])


if __name__ == "__main__":
    ut.main()
