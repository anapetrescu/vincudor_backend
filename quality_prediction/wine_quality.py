import pickle
import sys
import numpy as np

features = np.array(sys.argv[1:],ndmin=2).astype(np.float)

filename = 'quality_prediction/rfc_model.pkl'
with open(filename, 'rb') as handle:
    model = pickle.load(handle)
    prediction_model = model.predict(features)

prediction = str(np.ndarray.item(prediction_model))
sys.stdout.write(prediction)
sys.stdout.flush()
sys.exit(0)


