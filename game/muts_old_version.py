import functools
import random

ALT_COLOR_MAP = {'C>A': '#1fbdef',
                 'C>G': '#0d1011',
                 'C>T': '#e52b29',
                 'T>A': '#cac8ca',
                 'T>C': '#a0cd64',
                 'T>G': '#ecc6c3'}


PASSENGERS = ['APP', 'BUB3', 'ELN', 'GDF11', 'HDAC3', 'HSP90AA1', 'IKBKB', 'MAPK14',
              'MT-CO1', 'NFKBIA', 'POU1F1', 'PPARGC1A', 'RECQL4', 'TOP2B',
              'VEGFA', 'YWHAZ']


class Mela:
    alts = ['C>A'] * 6 + ['C>G'] * 6 + ['C>T'] * 70 + ['T>A'] * 6 + ['T>C'] * 6 + ['T>G'] * 6
    drivers = ['BRAF', 'NRAS', 'ANK3', 'MLL3', 'BAP1', 'CDKN2A', 'SVEP1', 'MECOM', 'MAP2K1', 'NF1']
    passengers = PASSENGERS
    driver_drug_map = {'BRAF': 'Sorafenib', 'NRAS': 'MEK inhibitors', 'ANK3': '',
                       'MLL3': '', 'BAP1': 'HDAC inhibitors', 'CDKN2A': 'CDK4/6 inhibitors',
                       'SVEP1': '', 'MECOM': '', 'MAP2K1': 'ERK inhibitors',
                       'NF1': 'PD1 Ab inhibitors'}


class Lung:
    alts = ['C>A'] * 50 + ['C>G'] * 11 + ['C>T'] * 11 + ['T>A'] * 11 + ['T>C'] * 11 + ['T>G'] * 6
    drivers = ['TP53', 'EGFR', 'MLL2', 'FGFR2', 'PIK3CA', 'CDKN2A', 'NF1', 'PTEN', 'NOTCH1', 'ARID1A', 'RB1']
    passengers = PASSENGERS
    driver_drug_map = {'TP53': 'HSP90 inhibitors', 'EGFR': 'Erlotinib', 'MLL2': 'Bicalutamide',
                       'FGFR2': 'FGFR inhibitors', 'PIK3CA': '', 'CDKN2A': 'Ilorasertib',
                       'NF1': '', 'PTEN': 'Sirolimus', 'NOTCH1': 'OMP-52M51',
                       'ARID1A': 'ATR inhibitors', 'RB1': '',
                       'DDR2': 'Dasatinib', 'EPHA2': 'MTOR inhibitors'}


MELA = Mela()
LUNG = Lung()


@functools.lru_cache(50)
def get(ttype, n, code=None):

    if ttype == 'skin':
        cancer = MELA
    elif ttype == 'lung':  # lung
        cancer = LUNG
    else:
        raise NotImplementedError

    result = []
    for i in range(n-1):
        d = {'id': i}

        # 30% change to be a driver except for the 1st (to ensure, at least, 1 driver)
        driver = True if i == 0 else random.random() >= 0.7

        if driver:
            d['driver'] = True
            gene = random.choice(cancer.drivers)
            d['gene'] = gene
            d['drug'] = cancer.driver_drug_map[gene]
        else:
            d['gene'] = random.choice(cancer.passengers)

        alt = random.choice(cancer.alts)
        d['alt'] = alt
        d['color'] = ALT_COLOR_MAP[alt]

        result.append(d)

    return result
