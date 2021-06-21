import argparse
import os
from os.path import join
import datetime
import subprocess
import json
import colorama
from colorama import Fore, Back, Style
import errno


def call(*positional, **dictionary):
    print(
        Fore.RED + "exec: " + positional[0] + Style.RESET_ALL
    )  # using print(locals()) will print all args as a dict/map
    subprocess.call(*positional, **dictionary)


def check_output(*positional, **dictionary):
    print(
        Fore.RED + "exec: " + positional[0] + Style.RESET_ALL
    )  # using print(locals()) will print all args as a dict/map
    return subprocess.check_output(*positional, **dictionary)


# Methods for writing files


def mkdirP(path):
    try:
        os.makedirs(path)
    except OSError as exc:  # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise


def safeOpen(path, mode):
    """Open "path" for writing, creating any parent directories as needed."""
    mkdirP(os.path.dirname(path))
    return open(path, mode)


cloudformationDeleteDictionary = {
    "DELETE_IN_PROGRESS": "DELETE_IN_PROGRESS",
    "DELETE_FAILED": "DELETE_FAILED",
}

stack_name = "recursive-thinking-server"

parser = argparse.ArgumentParser("rtw")
# parser.add_argument("--template", help="A file path to the CF template.  e.g. ./template.yml", default=pathCloudformationTemplateFile)
parser.add_argument("--stage", help="Stage to deploy the stack to", default="")
parser.add_argument(
    "--s3bucket", help="Name of the S3 bucket to deploy assets to"
)
parser.add_argument(
    "--region",
    help="The AWS region to create your assets in.",
    default="us-west-2",
)
args = parser.parse_args()

call(
    "aws cloudformation delete-stack --stack-name {0}".format(stack_name),
    shell=True,
)
# "aws cloudformation delete-stack \ --stack-name {0}".format('recursive-thinking-server')

status = check_output(
    "aws cloudformation describe-stacks --stack-name={0} --region={1}".format(
        "recursive-thinking-server", args.region
    ),
    shell=True,
)
stack_response = json.loads(status)
# print(stack_response)

# FOLDER NAME INFO FOR LOG DIRECTOR(IES)
deployDatetime = datetime.datetime.now()
dateString = deployDatetime.strftime("%Y%m%d")
timeString = deployDatetime.strftime("%H%M%S")

stackResponseInfoString = json.dumps(stack_response, indent=2, sort_keys=True)

stackStatus = stack_response["Stacks"][0]["StackStatus"]

if stackStatus == "DELETE_IN_PROGRESS":

    deployDirectoryPath = join(
        ".",
        "deployment_logs",
        "delete_stack",
        "success",
        dateString,
        timeString,
        "stack_response.json",
    )

    print(
        Fore.GREEN,
        "Delete of Stack: ",
        stack_name,
        ": IN PROGRESS" + Style.RESET_ALL,
    )

else:

    deployDirectoryPath = join(
        ".",
        "deployment_logs",
        "delete_stack",
        "errors",
        dateString,
        timeString,
        "stack_response.json",
    )

    print(
        Fore.RED, "Delete of Stack: ", stack_name, ": FAILED" + Style.RESET_ALL
    )

# WRITE STACK LOGS - EITHER SUCCESS OR FAIL
deployStack = safeOpen(deployDirectoryPath, "w")
deployStack.write(stackResponseInfoString)
deployStack.close()
