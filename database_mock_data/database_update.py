# Use When just one table or tables models update

import subprocess
import colorama
from colorama import Fore, Back, Style


def call(*positional, **dictionary):
    print(
        Fore.BLUE + "exec: " + positional[0] + Style.RESET_ALL
    )  # using print(locals()) will print all args as a dict/map
    subprocess.call(*positional, **dictionary)


tables = [
    # "RecursiveThinkingUsers",
    # RecursiveThinkingLessons
    # RecursiveThinkingInterviewQuestions
    # RecursiveThinkingInterviewQuestionsAnswers
    # RecursiveThinkingSkills
    # RecursiveThinkingRanks,
    "RecursiveThinkingHomeScreenQuotes",
]

for table in tables:
    call(
        "aws dynamodb batch-write-item --request-items file://../database_mock_data/_database_fill/{1}.json --region={0}".format(
            "us-west-2", table
        ),
        shell=True,
    )

# To Run - python <filename>