# Generated by Django 4.2.19 on 2025-03-30 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phenapp', '0003_clinic_rename_usuari_pacient_delete_client_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='clinic',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='clinic',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='clinic',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.DeleteModel(
            name='Log',
        ),
    ]
