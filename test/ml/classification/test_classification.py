
import unittest as ut
import sys
sys.path.append("../../../package")

import ml.classification


class TestClassification(ut.TestCase):

    def setUp(self):
        super(TestClassification, self).setUp()

    def test_knn(self):
        model = ml.classification.getClassifierByName("KNN")
        data = dict()
        data["features"] = [[0], [1], [2], [3]]
        data["label"] = [0, 0, 1, 1]
        model.train(data)
        self.assertEquals(model.predict([[1.1]]), [0])


    def test_svm(self):
        model = ml.classification.getClassifierByName("SVM")
        data = dict()
        data["features"] = [[0], [1], [2], [3]]
        data["label"] = [0, 0, 1, 1]
        model.train(data)
        self.assertEquals(model.predict([[1.1]]), [0])

    def test_bayes(self):
        model = ml.classification.getClassifierByName("Bayes")
        data = dict()
        data["features"] = [[0], [1], [2], [3]]
        data["label"] = [0, 0, 1, 1]
        model.train(data)
        self.assertEquals(model.predict([[1.1]]), [0])


if __name__ == "__main__":
    ut.main()
