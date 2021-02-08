import click
import functools
import os
import pandas as pd
import random

_THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))


@click.command()
@click.option(
    "--cancer_type", "-c", required=True, help="Cancer type: must be 'lung' or 'skin'"
)
@click.option(
    "--n_muts",
    "-n",
    required=False,
    default=0,
    help="Number of mutations for the output. Default is a random value between 1 and 6",
)
@click.option(
    "--dir_path",
    "-d",
    required=False,
    default=False,
    help="Path for the output tsv file. Default is the current directory",
)
def cli(cancer_type, n_muts, dir_path):

    df = run(cancer_type, n_muts, code=None)

    if dir_path == False:
        dir_path = os.getcwd() + "/"

    print(df)
    df.to_csv(dir_path + "results.tsv", sep="\t", index=False)


@functools.lru_cache(50)
def run(cancer_type, n_muts, code=None):

    if n_muts == 0:
        n = random.choice(list(range(1, 7)))
    else:
        n = n_muts

    # Get database
    df = pd.read_csv(
        os.path.abspath(
            os.path.join(_THIS_FOLDER, "../static/data/code/mutations_db.tsv.gz")
        ),
        sep="\t",
    )

    # Select cancer type alterations
    df_ct = df[df["cancer_type"] == cancer_type]

    # Create final df with list of mutations
    final_df = pd.DataFrame()
    for i in range(n):
        # 30% change to be a driver except for the 1st (to ensure, at least, 1 driver)
        driver = True if i == 0 else random.random() >= 0.7
        if driver:
            if i == 0:
                # Get the first driver with therapy
                df_drivers_therapy = df_ct[
                    (df_ct["driver_passenger"] == "driver")
                    & (df_ct["targeted_therapy"] != "None")
                ]
                driver_therapy = df_drivers_therapy.sample()
                final_df = pd.concat([final_df, driver_therapy])
            else:
                # While loop is in order to not repeat genes.
                stop = False
                while stop == False:
                    # Get the other drivers
                    df_drivers = df_ct[df_ct["driver_passenger"] == "driver"]
                    drivers = df_drivers.sample()
                    if drivers["gene"].to_list() not in final_df["gene"].to_list():
                        stop = True
                final_df = pd.concat([final_df, drivers])
        else:
            # While loop is in order to not repeat genes.
            stop = False
            while stop == False:
                # Get the other drivers
                df_passengers = df_ct[df_ct["driver_passenger"] == "passenger"]
                passengers = df_passengers.sample()
                if passengers["gene"].to_list() not in final_df["gene"].to_list():
                    stop = True
            final_df = pd.concat([final_df, passengers])
    return final_df


if __name__ == "__main__":
    cli()
