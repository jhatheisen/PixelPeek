from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField
from wtforms.validators import DataRequired

def text_validator(form, field):
    if len(field.data) > 225 :
        raise ValidationError('Field must less than 225 characters long.')

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
