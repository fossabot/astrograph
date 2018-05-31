package dataloader

import (
  "time"
  "context"
  "net/http"
  "database/sql"
  "github.com/mobius-network/astrograph/db"
  "github.com/mobius-network/astrograph/model"
)

func TustlineLoaderMiddleware(db *sql.DB, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		trustlineLoader := TrustlineLoader{
			maxBatch: 100,
			wait:     1 * time.Millisecond,
			fetch: func(keys []string) ([]*model.Trustline, []error) {
        r, err := db.QueryTrustlines(keys)
        if (err != nil) { return nil, []error{err} }

        rh := make([]*model.Trustline, len(r))
        for i, v := range r {
          rh[i] = &v
        }

        return rh, nil
			},
		}
		ctx := context.WithValue(r.Context(), trustlineLoaderKey, &trustlineLoader)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
