import yfinance as yf


def fetch_data(ticker_symbol):
    ticker = yf.Ticker(ticker_symbol)

    # get historical market data
    hist = ticker.history(period="5y")  # 5 years of data

    return hist
