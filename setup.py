import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    install_requires=[
        'django',
        'django-cors-headers',
        'django-filter',
        'djangorestframework',
        'djangorestframework-simplejwt',
        'djoser',
        'httpie',
        'markdown',
        'Pillow',
        'python-barcode',
        'requests',
    ],
    include_package_data=True,

    name='cwrups',
    version='0.0.0',
    author='Elise Epstein, Long Phan, Phan Trinh Ha, and Tyler Thieding',
    author_email='python@thieding.com',
    maintainer='Elise Epstein, Long Phan, Phan Trinh Ha, and Tyler Thieding',
    maintainer_email='python@thieding.com',
    url='https://gitlab.com/TNThieding/cwrups',
    description='Final course project for EECS 341 (Introduction to Databases).',
    long_description=long_description,
    download_url='https://gitlab.com/TNThieding/cwrups',
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 3',
        ],
    license='MIT License',
    packages=setuptools.find_packages(),
    entry_points={
        'console_scripts': [
        ]
    }
)