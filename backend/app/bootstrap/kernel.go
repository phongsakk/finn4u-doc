package bootstrap

import (
	"github.com/phongsakk/finn4u-back/app/database/migration"
)

func Boot() error {
	if err := migration.Migrate(); err != nil {
		return err
	}
	return nil
}
