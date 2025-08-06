# Generated manually to convert category from ForeignKey to CharField
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0005_alter_child_colour'),
    ]

    operations = [
        # Remove the foreign key constraint first
        migrations.RemoveField(
            model_name='entry',
            name='category',
        ),
        # Add the new CharField
        migrations.AddField(
            model_name='entry',
            name='category',
            field=models.CharField(
                blank=True, 
                choices=[
                    ('none', 'None'),
                    ('homework', 'Homework'),
                    ('health', 'Health'),
                    ('school', 'School'),
                    ('activities', 'Activities'),
                    ('chores', 'Chores'),
                    ('appointments', 'Appointments'),
                    ('reminders', 'Reminders'),
                    ('celebrations', 'Celebrations'),
                    ('achievements', 'Achievements'),
                    ('other', 'Other'),
                ], 
                default='none', 
                max_length=20
            ),
        ),
    ]
