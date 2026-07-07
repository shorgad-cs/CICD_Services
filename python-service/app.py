from flask import Flask, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/api/python', methods=['GET'])
def get_data():
    return jsonify({
        "message": "Hello from Python Flask Service!",
        "timestamp": datetime.utcnow().isoformat()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)