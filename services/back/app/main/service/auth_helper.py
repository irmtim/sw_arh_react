from app.main.model.user import User
# from ..service.blacklist_service import save_token
from typing import Dict, Tuple

class Auth:

    @staticmethod
    def login_user(data: Dict[str, str]) -> Tuple[Dict[str, str], int]:
        try:
            # тестовые данные
            
            user_name = data.get('login')
            password = data.get('password')
            
            if (user_name == 'admin' and password == 'admin'):
                auth_token = User.encode_auth_token(user_name, password)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'api_token': auth_token#.decode()
                    }
                    return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    # @staticmethod
    # def logout_user(data: str) -> Tuple[Dict[str, str], int]:
    #     if data:
    #         auth_token = data.split(" ")[1]
    #     else:
    #         auth_token = ''
    #     if auth_token:
    #         resp = User.decode_auth_token(auth_token)
    #         if not isinstance(resp, str):
    #             # mark the token as blacklisted
    #             return save_token(token=auth_token)
    #         else:
    #             response_object = {
    #                 'status': 'fail',
    #                 'message': resp
    #             }
    #             return response_object, 401
    #     else:
    #         response_object = {
    #             'status': 'fail',
    #             'message': 'Provide a valid auth token.'
    #         }
    #         return response_object, 403

    @staticmethod
    def check_token(new_request):
        # get the auth token
        auth_header = new_request.headers.get('Authorization')
        auth_header = auth_header.replace('Bearer ', '')
        
        payload = User.decode_auth_token(auth_header)
        
        return Auth.login_user(payload)
            
    @staticmethod
    def get_user_info(auth_token):
        # get the auth token
        # auth_token = new_request.headers.get('Authorization')
        # auth_token = session['token']
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if resp:
                response_object = {
                    'id': '',
                    'name': resp['login'],
                    'roles': []
                }
                return response_object, 200
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 401
            