
import unittest as ut
import sys
sys.path.append("../../package")

import ml


class TestML(ut.TestCase):

    def setUp(self):
        super(TestML, self).setUp()

    def test_ml(self):
        model = ml.createModel("Classification", "KNN")
        data = dict()
        data["features"] = [[0], [1], [2], [3]]
        data["label"] = [0, 0, 1, 1]
        model.train(data)
        self.assertEquals(model.predict([[1.1]]), [0])


if __name__ == "__main__":
    ut.main()
