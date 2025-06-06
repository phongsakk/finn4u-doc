# main.py

from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
import pandas as pd

source_db_url = "postgresql+psycopg2://finn4udbuser:nnif4udbpassword@203.159.93.236:8077/finn4u"
dest_db_url = "postgresql+psycopg2://finn4udbuser:nnif4udbpassword@203.159.93.236:9077/finn4u"

def main():
    print("🔁 PostgreSQL Table Copy Tool")
    table_name = input("📋 Table name to copy:\n> ").strip()

    try:
        print("⏳ Connecting to source database...")
        source_engine = create_engine(source_db_url)
        with source_engine.connect() as conn:
            print("✅ Connected to source.")
            print(f"⏳ Reading data from '{table_name}'...")
            result = conn.execute(text(f"SELECT * FROM {table_name}"))
            df = pd.DataFrame(result.fetchall(), columns=result.keys())
            print(f"✅ Retrieved {len(df)} rows from '{table_name}'.")

    except SQLAlchemyError as e:
        print(f"❌ Error reading from source: {e}")
        return

    try:
        print("⏳ Connecting to destination database...")
        dest_engine = create_engine(dest_db_url)
        with dest_engine.begin() as conn:
            print(f"⏳ Writing to '{table_name}' on destination...")
            # df.to_sql(table_name, conn, if_exists="replace", index=False)
            df.to_sql(table_name, dest_engine, if_exists='append', index=False)
            print("✅ Data copied successfully.")

    except SQLAlchemyError as e:
        print(f"❌ Error writing to destination: {e}")

if __name__ == "__main__":
    main()
