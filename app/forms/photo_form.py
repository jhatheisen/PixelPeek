from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, SubmitField, IntegerField,
)
from wtforms.validators import DataRequired, ValidationError, NumberRange

def title_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 50 :
        raise ValidationError('Title must be between 3 and 50 characters long')

def description_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 500 :
        raise ValidationError('Description must be between 3 and 500 characters long')

def city_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 30 :
        raise ValidationError('City must be between 3 and 30 characters long')

def state_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 30 :
        raise ValidationError('State must be between 3 and 30 characters long')

def country_validator(form, field):
    if len(field.data) < 3 or len(field.data) > 20 :
        raise ValidationError('Country must be between 3 and 20 characters long')

class CreatePhotoForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), title_validator])
  description = StringField('description', validators=[DataRequired(), description_validator])
  city = StringField('city', validators=[DataRequired(), city_validator])
  state = StringField('state', validators=[DataRequired(), state_validator])
  country = StringField('country', validators=[DataRequired(), country_validator])
  img_url = StringField('img_url', validators=[DataRequired()])

class EditPhotoForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), title_validator])
  description = StringField('description', validators=[DataRequired(), description_validator])
  city = StringField('city', validators=[DataRequired(), city_validator])
  state = StringField('state', validators=[DataRequired(), state_validator])
  country = StringField('country', validators=[DataRequired(), country_validator])
  img_url = StringField('img_url', validators=[DataRequired()])
