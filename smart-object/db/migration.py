import sqlite3

if __name__ == '__main__':
    conn = sqlite3.connect('../example.db')
    c = conn.cursor()

    # Create table
    c.execute('''create table Keys (value)''')

    # Insert a row of data
    c.execute("INSERT INTO Keys VALUES ('test')")

    # Save (commit) the changes
    conn.commit()

    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    conn.close()
