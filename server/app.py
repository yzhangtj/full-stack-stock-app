from flask import Flask, request, jsonify
from fetch_data import fetch_data
from data_preprocessing import preprocess_data
from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
CORS(app, origins=["http://localhost:3001"])

@app.route("/stock_history", methods=["GET"])
def get_stock_history():
    # Get ticker symbol from request parameters
    ticker = request.args.get("ticker")

    # Fetch and preprocess stock history
    hist = fetch_data(ticker)
    preprocessed_hist = preprocess_data(hist)

    # Convert the index to datetime dtype and format the dates
    preprocessed_hist.index = pd.to_datetime(preprocessed_hist.index)
    preprocessed_hist.index = preprocessed_hist.index.strftime('%m/%d/%Y')

    # Convert DataFrame to JSON and return it
    return jsonify(preprocessed_hist.to_dict())

if __name__ == "__main__":
    app.run(port=5000)
