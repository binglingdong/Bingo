# Generated by Django 3.0.4 on 2020-03-13 20:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20200313_1358'),
    ]

    operations = [
        migrations.RenameField(
            model_name='application',
            old_name='student',
            new_name='userid',
        ),
        migrations.RemoveField(
            model_name='application',
            name='status',
        ),
    ]
