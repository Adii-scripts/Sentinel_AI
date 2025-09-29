import os
import pandas as pd
import joblib
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from .features import extract_features

# Define base directory (Backend folder)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'urls.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'model_assets', 'xgb_model.joblib')

def predict(features_dict):
    """Load the trained model and make a prediction from a features dictionary."""
    model = joblib.load(MODEL_PATH)
    import numpy as np
    feature_values = np.array([list(features_dict.values())])
    prediction = int(model.predict(feature_values)[0])
    return prediction

if __name__ == "__main__":
    print("Loading data from:", DATA_PATH)
    df = pd.read_csv(DATA_PATH)
    print("Engineering features...")
    features_df = df['url'].apply(extract_features).apply(pd.Series)
    X = features_df
    # Convert 'type' column to binary target (e.g., 'benign'->0, 'malicious'/'phishing'->1)
    y = df['type'].apply(lambda x: 1 if str(x).lower() in ['malicious', 'phishing'] else 0)
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print("Training model...")
    model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
    model.fit(X_train, y_train)
    print("Saving model to:", MODEL_PATH)
    joblib.dump(model, MODEL_PATH)
    print("Model saved successfully!")
