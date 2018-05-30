package config

import (
  "fmt"
  "log"
  "database/sql"
	_ "github.com/lib/pq"
  "gopkg.in/alecthomas/kingpin.v2"
)

const version string = "0.0.1"

var (
  BindAndPort string
  DatabaseDriver string
  Db *sql.DB

  Port = kingpin.Flag("port", "HTTP port to bind").Default("8000").Int()
  Bind = kingpin.Flag("bind", "HTTP address to bind").Default("127.0.0.1").IP()
  DatabaseUrl = kingpin.Flag("database-url", "Stellar Core database URL").Required().URL()
  IngestTimeout = kingpin.Flag("ingest-timeout", "Ingest frequency").Default("2").Int()
  Debug = kingpin.Flag("debug", "Log debug messages").Default("false").Bool()
)

func init() {
  kingpin.Version(version)
  kingpin.Parse()

  BindAndPort = fmt.Sprintf("%s:%v", *Bind, *Port)
  DatabaseDriver = (*DatabaseUrl).Scheme

  db, err := sql.Open(DatabaseDriver, (*DatabaseUrl).String())
  if err != nil { log.Fatal(err) }

  err = db.Ping();
  if err != nil { log.Fatal(err) }

  Db = db
}
