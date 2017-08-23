
is_correct_branch() {
    if test -n "${1}"
    then
        desired_branch="${1}"
    else
        desired_branch="production"
    fi

    current_branch=`git symbolic-ref --short HEAD`
    if test "${current_branch}" != "${desired_branch}"
    then
        echo
        echo "ERROR: You are not currently on the ${desired_branch} branch. Cannot proceed."
        echo
        exit 1
    fi
}

is_working_tree_clean() {
    tree_is_clean=`git status -s`
    if test -n "${tree_is_clean}"
    then
        echo
        echo "ERROR: The working tree is not clean. Cannot proceed."
        echo
        exit 1
    fi
}

export -f is_correct_branch is_working_tree_clean
