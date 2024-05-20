"""updated files and folders

Revision ID: b96f8ba6adc1
Revises: c2451ad715dd
Create Date: 2024-05-18 10:40:49.106887

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'c2451ad715dd'
down_revision = '5a74661a8425'
branch_labels = None
depends_on = None




def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('files', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))

    with op.batch_alter_table('folders', schema=None) as batch_op:
        batch_op.alter_column('folder_name',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=255),
               existing_nullable=False)
        batch_op.drop_constraint('fk_folders_parent_folder_id', type_='foreignkey')
        batch_op.drop_column('created_at')
        batch_op.drop_column('parent_folder_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('folders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('parent_folder_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('created_at', sa.DATETIME(), nullable=True))
        batch_op.create_foreign_key('fk_folders_parent_folder_id', 'folders', ['parent_folder_id'], ['id'])
        batch_op.alter_column('folder_name',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=100),
               existing_nullable=False)

    with op.batch_alter_table('files', schema=None) as batch_op:
        batch_op.drop_column('created_at')
    # ### end Alembic commands ###
