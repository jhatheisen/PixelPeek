from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired, ValidationError

def text_validator(form, field):
    if len(field.data) > 20 :
        raise ValidationError('Field must less than 20 characters long.')
    

class TagsForm(FlaskForm):
   tag_name = StringField('tag_name', validators=[DataRequired(), text_validator])
