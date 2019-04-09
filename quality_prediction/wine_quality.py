import pickle
import sys
import numpy as np

features = np.array(sys.argv[1:],ndmin=2).astype(np.float)

filename = 'rfc_model.pkl'
with open(filename, 'rb') as handle:
    model = pickle.load(handle)
    prediction = model.predict(features)

print(prediction)
sys.stdout.flush()