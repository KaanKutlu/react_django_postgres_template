import requests
import random
import time
import string
import random
import json

def main():
    #(Pdb) data["variants"][0]
    #{'name': 'N771DELinsVH', 'id': 1662, 'evidence_items': {'accepted_count': 0, 'rejected_count': 0, 'submitted_count': 1}}
    #(Pdb) variant_data.keys()
    #dict_keys(['id', 'entrez_name', 'entrez_id', 'name', 'description', 'gene_id', 'type', 'variant_types', 'civic_actionability_score', 'flagged', 'updated_at', 'coordinates', 'evidence_items', 'variant_groups', 'assertions', 'variant_aliases', 'hgvs_expressions', 'clinvar_entries', 'lifecycle_actions', 'sources', 'allele_registry_id', 'allele_registry_hgvs', 'provisional_values', 'errors'])


    gene = requests.get(
        'https://civicdb.org/api/genes/1956?identifier_type=entrez_id'
    ).json()

    print(gene)
    print(gene.keys())
    exit(0)
    max_accept = 0
    max_item = None

    for variant in gene["variants"]:
        evidence = variant["evidence_items"]
        current_accepted_count = evidence["accepted_count"]
        if current_accepted_count > max_accept:
            max_item = variant
            max_accept = current_accepted_count
    

    max_id_for_variant = max_item["id"]
    print(max_id_for_variant)
    for e in gene["variants"]:
        id = e["id"]

        variant = requests.get(
            "https://civicdb.org/api/variants/{}".format(id)
        ).json()
        print(variant.keys())
        if variant["evidence_items"]:
            print(variant["evidence_items"])
            print(variant["evidence_items"][0].keys())
            print(id)
            exit(0)
     
    print(variant.keys())
    print(variant["evidence_items"])

if __name__ == "__main__":
    main()