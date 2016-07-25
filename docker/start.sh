#!/bin/bash
cd /home/dataplay2/package/static
exec /usr/local/bin/babel --presets es2015,react --watch js/ --out-dir lib/ &

cd /home/dataplay2/package
export FLASK_APP=main.py
flask run --host=0.0.0.0