

/**
 * BINARY TREE [data structure]
 * Task: sum all the values from every level of concern
 */

type TreeNode = {
    value: number;
    left?: TreeNode;
    right?: TreeNode;
};

const binaryTree: TreeNode = {
    value: 7,
    left: {
        value: 5,
        left: {
            value: 5,
            left: {
                value: 5,
            },
            right: {
                value: 4,
                right: {
                    value: 4,
                    right: {
                        value: 4,
                    },
                },
            },
        },
        right: {
            value: 4,
        },
    },
    right: {
        value: 4,
    },
};

const sumTree = (tree: TreeNode): number => {
    let sum = 0;
    if (tree.value) {
        sum += tree.value;
    }
    if (tree.left) {
        sum += sumTree(tree.left);
    }
    if (tree.right) {
        sum += sumTree(tree.right);
    }
    return sum;
};

console.log(sumTree(binaryTree));
