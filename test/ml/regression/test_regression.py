
import unittest as ut
import sys
sys.path.append("../../../package")

import ml.regression


class TestRegression(ut.TestCase):

    def setUp(self):
        super(TestRegression, self).setUp()

    def test_linear(self):
        model = ml.regression.getRegressionByName("Linear")
        data = dict()
        data["train"] = [[0], [1], [2], [3]]
        data["target"] = [4, 5, 6, 7]
        model.train(data)
        self.assertEquals(model.predict([[1.5]]), [5.5])

    def test_logistic(self):
        model = ml.regression.getRegressionByName("Logistic")
        data = dict()
        data["train"] = [[0], [1], [2], [3]]
        data["target"] = ["1", "1", "0", "0"]
        model.train(data)
        self.assertEquals(model.predict([[1.2]]), ["1"])
        print model.predict_proba([[0], [1], [1.2], [2], [3]])


if __name__ == "__main__":
    ut.main()
