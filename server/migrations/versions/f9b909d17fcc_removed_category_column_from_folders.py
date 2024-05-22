"""removed category column from folders

Revision ID: f9b909d17fcc
Revises: d7c3122a7033
Create Date: 2024-05-20 10:52:22.138620

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9b909d17fcc'
down_revision = 'd7c3122a7033'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('folders', schema=None) as batch_op:
        batch_op.drop_column('category')
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('folders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DATETIME(), nullable=True))
        batch_op.add_column(sa.Column('category', sa.VARCHAR(length=20), nullable=True))

    # ### end Alembic commands ###
