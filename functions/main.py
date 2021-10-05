import stream
from flask import escape, abort

import os

# Import the Firebase service
import firebase_admin
from firebase_admin import auth

# Initialize the default app
default_app = firebase_admin.initialize_app()

def checkAuthorizedUserFirebaseToken(id_token):
  try:
    decoded_token = auth.verify_id_token(id_token)
    uid = decoded_token['uid']
  except auth.InvalidIdTokenError:
    uid = None

  return uid


def createUserToken(request):
  """
    request is of type Flask Request
    generate Stream token for given user_id
  """
  # grab Auth bearer from request
  authorization = request.headers['Authorization']
  id_token = authorization.split('Bearer ')[1]
  uid = checkAuthorizedUserFirebaseToken(id_token)
  if not uid:
    abort(403, description='Authorization header missing or incorrect.')

  content_type = request.headers['content-type']
  if 'json' in content_type:
      try:
        data = request.get_json()
        user_id = data.get('user_id', '')
      except KeyError:
        abort(400, description="Missing user_id in posted json data.")

  else:
    abort(400, description="You need to set content-type to json.")

  STREAM_API_KEY = os.environ['STREAM_API_KEY']
  STREAM_API_KEY_SECRET = os.environ['STREAM_API_KEY_SECRET']
  client = stream.connect(STREAM_API_KEY, STREAM_API_KEY_SECRET)

  user_token = client.create_user_token(user_id)

  return(user_token)

