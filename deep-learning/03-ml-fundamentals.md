# 03 · Machine Learning Fundamentals
> **Goal:** the concepts every DL model inherits: loss, generalization, evaluation. · **Time:** 20–30 h · **Needs:** 01, 02

## Skip test
- [ ] Explain train / validation / test splits and why tuning on the test set is cheating.
- [ ] Derive the logistic regression gradient. Explain why its loss is cross-entropy.
- [ ] Explain the bias–variance trade-off, and how L2 regularization changes it.
- [ ] For an imbalanced dataset (1% positive), explain why accuracy is misleading, and define precision, recall, F1, and ROC-AUC.
- [ ] Explain k-fold cross-validation and data leakage, with an example.

## Core ideas
- **Learning = optimization + generalization.** Fit training data (minimize empirical risk) and do well on unseen data. The second is the hard part.
- **Supervised setup:** data $(x_i, y_i)$, model $f_\theta$, loss $\ell$, minimize $\frac1N\sum\ell(f_\theta(x_i), y_i)$.
- **Linear regression:** $\hat y = \mathbf w^\top\mathbf x + b$, MSE loss, closed form $\mathbf w = (X^\top X)^{-1}X^\top\mathbf y$.
- **Logistic regression:** $p(y{=}1\mid\mathbf x) = \sigma(\mathbf w^\top\mathbf x)$, binary cross-entropy loss, gradient $X^\top(\hat{\mathbf y}-\mathbf y)$. **A neural net is stacked logistic regressions.**
- **Softmax regression:** the multi-class version, with categorical cross-entropy.
- **Generalization:**
  - **Underfitting** (high bias): train error high. → Bigger model, more features, train longer.
  - **Overfitting** (high variance): train ≪ val error. → More data, regularization, augmentation, early stopping.
  - Deep nets break the classic U-curve (**double descent**, see module 12), but the diagnosis above still guides practice.
- **Regularization:** L2/weight decay (Gaussian prior), L1 (sparsity), early stopping, and later dropout.
- **Evaluation:** a held-out **test set touched once**. Use a **validation set** for decisions. Cross-validation for small data.
- **Metrics:** accuracy, precision/recall/F1, ROC-AUC, confusion matrix (classification); MSE/MAE/$R^2$ (regression).
- **Data leakage:** information from the test set or the future leaks into training (e.g. normalizing with statistics from all data). It's the #1 source of fake results.
- **Feature scaling:** standardize inputs (mean 0, std 1). This matters for GD convergence (conditioning, from module 01).
- **Other classical models (know what they are, don't master them):** k-NN, decision trees, random forests, **gradient boosting (XGBoost/LightGBM)**, SVM, k-means, PCA. Boosted trees still beat DL on many *tabular* problems.

## Learn from
- ⭐ **[Machine Learning Specialization (Andrew Ng, Coursera)](https://www.coursera.org/specializations/machine-learning-introduction)**: courses 1–2. Audit for free. You'll move fast. Or, if you prefer reading:
- ⭐ (alt) **[An Introduction to Statistical Learning, with Python (ISLP)](https://www.statlearning.com/)**: free PDF, ch. 2–6, 8, 10, 12.
- **[Stanford CS229 lecture notes](https://cs229.stanford.edu/main_notes.pdf)**: the math-heavy version, which suits you well (GLMs, the exponential family).
- **[scikit-learn user guide](https://scikit-learn.org/stable/user_guide.html)**: the practical API and a great reference.
- **[Google ML Crash Course](https://developers.google.com/machine-learning/crash-course)**: quick, interactive refresher.

## Build
1. **Logistic regression from scratch in NumPy** (gradient descent, no sklearn) on a binary dataset. Plot the loss curve and the decision boundary.
2. Same dataset with `sklearn`: compare against yours, then run 5-fold cross-validation and a grid search over the regularization strength.
3. A Kaggle "Getting Started" competition (Titanic or House Prices): full pipeline with a gradient-boosting baseline.

## Traps
- Celebrating 99% accuracy on a 99%-majority dataset.
- Fitting the scaler on all the data before splitting (leakage).
- Skipping baselines. **Always** compare against a trivial baseline (predict the mean or the majority class).

## Done when
- [ ] Scratch and sklearn logistic regression agree · [ ] you can explain every number on your confusion matrix
