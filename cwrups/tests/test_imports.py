"""Verify that each module and the modules it integrates/imports are importable by Python."""

import fnmatch
import importlib
import os

import pytest

import cwrups as this_package
from django.test import override_settings

OMITTED_FILES = [
    # Must use Linux-style path separators (i.e. forward slashes only).
    "cwrups/tests/*.py"
]


def get_package_module_names():
    """Get importable names of all modules within this package.

    :returns: module names
    :rtype: list of str

    """
    package_dir = os.path.abspath(os.path.dirname(this_package.__file__))
    package_home = os.path.dirname(package_dir)

    modules = []
    for path, _subdirs, files in os.walk(package_dir):
        for file_name in files:
            if file_name.endswith(".py"):
                relative_path = os.path.relpath(os.path.join(path, file_name), package_home)

                for item in OMITTED_FILES:
                    if fnmatch.fnmatch(relative_path, item.replace('/', os.path.sep)):
                        break

                    base_path, _ext = os.path.splitext(relative_path)
                    import_path = base_path.replace(os.path.sep, '.')
                    modules.append(import_path)

    return modules


@pytest.mark.parametrize("module", get_package_module_names())
def test_import(module):
    """Check if module is importable.

    :param str module: import-style filename of module

    """
    importlib.import_module(module)
