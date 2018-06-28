package db

import (
	"database/sql"
	sq "github.com/Masterminds/squirrel"
	"github.com/mobius-network/astrograph/model"
	"github.com/mobius-network/astrograph/config"
)

// Returns single account or nil
func QueryAccount(id string) (*model.Account, error) {
	var account model.Account

	q, args, err := accountsSql.Where(sq.Eq{"accountid": id}).ToSql()
	if (err != nil) { return nil, err }

	err = config.DB.Get(&account, q, args...)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, err
	default:
		account.DecodeRaw()
		return &account, nil
	}
}

// Returns a set of accounts by id
func QueryAccounts(id []string) ([]*model.Account, error) {
	var accounts []*model.Account

	q, args, err := accountsSql.Where(sq.Eq{"accountid": id}).ToSql()
	if err != nil { return nil, err }

	err = config.DB.Select(&accounts, q, args...)
	if err != nil { return nil, err }

	for _, a := range accounts {
		a.DecodeRaw()
	}

	return accounts, nil
}
