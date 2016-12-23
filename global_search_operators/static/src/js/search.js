(function() {

var instance = openerp,
    _lt = instance.web._lt,
    my = instance.web.search;

instance.web.SearchView.include({
    build_search_data: function () {
        var domains = [], contexts = [], groupbys = [], errors = [];
        this.query.each(function (facet) {
            var field = facet.get('field');
            try {
                var domain = field.get_domain(facet);
                if (domain) {
                    if (jQuery.isArray(domain)) {
                        var searchProp = jQuery('.searchview_extended_prop_op');
                        if (searchProp.length > 0) {
                            searchProp = searchProp.find(':selected');
                            var result = domain[0][2];
                            // Remove 'contains' if it is followed by text
                            // due to Odoo bug in 'Search More' search views
                            // automatically prefixing searchProp.text() with 'contains'
                            // Resulting in the following cases not working
                            switch(searchProp.text().replace(/^contains(.)/, '$1')) {
                                case 'starts with':
                                    domain[0][2] = result + '%';
                                    break;
                                case 'ends with':
                                    domain[0][2] = '%' + result;
                                    break;
                                case 'does not start with':
                                    domain[0][2] = result + '%';
                                    break;
                                case 'does not end with':
                                    domain[0][2] = "%" + result;
                                    break
                            }
                        }
                    }
                    domains.push(domain);
                }
                var context = field.get_context(facet);
                if (context) {
                    contexts.push(context);
                }
                var group_by = field.get_groupby(facet);
                if (group_by) {
                    groupbys.push.apply(groupbys, group_by);
                }
            } catch (e) {
                if (e instanceof instance.web.search.Invalid) {
                    errors.push(e);
                } else {
                    throw e;
                }
            }
        });
        return {
            domains: domains,
            contexts: contexts,
            groupbys: groupbys,
            errors: errors
        };
    }
});

instance.web.search.ExtendedSearchProposition.Char = instance.web.search.ExtendedSearchProposition.Field.extend({
    template: 'SearchView.extended_search.proposition.char',
    operators: [
        {value: "ilike", text: _lt("contains")},
        {value: "not ilike", text: _lt("doesn't contain")},
        {value: "=", text: _lt("is equal to")},
        {value: "!=", text: _lt("is not equal to")},
        {value: "∃", text: _lt("is set")},
        {value: "∄", text: _lt("is not set")},
        // Adding in new search operators
        {value: "=ilike", text: _lt("starts with")},
        {value: "=ilike", text: _lt("ends with")},
        {value: "not like", text: _lt("does not start with")},
        {value: "not like", text: _lt("does not end with")},
    ],
    get_value: function() {
        return this.$el.val();
    }
})

})();

// vim:et fdc=0 fdl=0 foldnestmax=3 fdm=syntax:
