odoo-search-operators
================

# global_search_operators

Adds four global search operators for char fields to Odoo by extending `instance.web.search.ExtendedSearchProposition.Char`. These include:
* `starts with` / `does not start with`
* `ends with` / `does not end with`

These can be mixed in with other operators as usual.

Extra handling was also needed in the `build_search_data` function prefix/suffix wild cards to the user-inputted strings.

## TODO:
Remove cruft from search.js file, as it is currently just a copy paste of the core one, with a few lines added to it.


# Copyright and License

Copyright (C) 2015 OpusVL

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

If you require assistance, support, or further development of this
software, please contact OpusVL using the details below:

* Telephone: +44 (0)1788 298 410
* Email: community@opusvl.com
* Web: http://opusvl.com
