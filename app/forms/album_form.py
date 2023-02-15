from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def text_validator(form, field):
    if len(field.data) > 225 :
        raise ValidationError('Name mus be less than 225 characters long.')

class CreateAlbumForm(FlaskForm):
    album_name = StringField('comment', validators=[DataRequired(), text_validator])
    