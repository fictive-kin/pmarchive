# pmarchive
pmarchive.com

# First time installation
 1. Clone repository onto local machine
 2. `$ cd` into project directory
 3. run `$ virtualenv venv`
 4. `$ source venv/bin/activate`
 5. `$ pip install -r requirements.txt`
 6. `$ python app.py` will start a webserver on port `5000` - see `localhost:5000`
 7. Install scss following these steps: http://sass-lang.com/install

# Running the server
 1. `$ export FLASK_DEBUG=1` this reruns itself on code changes rather than having to manually restart the server every time you make a change
 2. `$ python app.py` will start a webserver on port `5000` - see `localhost:5000`

# Compiling scss
 1. in a separate terminal window, cd to the `static` directory
 2. run `$ sass --watch scss:css`
