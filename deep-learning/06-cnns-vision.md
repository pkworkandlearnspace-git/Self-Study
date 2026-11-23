# 06 · CNNs & Computer Vision
> **Goal:** understand convolution, the classic architectures, and modern vision. · **Time:** 20–25 h · **Needs:** 05

> [!GOAL]
> By the end of this chapter you can:
>
> - compute a convolution by hand, and its output size and parameter count;
> - explain **weight sharing, translation equivariance, receptive field** and pooling;
> - tell the story of vision architectures from LeNet to ResNet, ConvNeXt and the **Vision Transformer**;
> - use data augmentation and **transfer learning** effectively;
> - describe detection and segmentation, and the vision foundation models you can download today.

## Skip test
- [ ] Compute the output size of a conv: input 32, kernel 5, stride 2, padding 2.
- [ ] Count the parameters of `Conv2d(64, 128, kernel_size=3)` and explain why it's tiny next to a dense layer.
- [ ] Explain **translation equivariance**, **weight sharing**, and **receptive field**.
- [ ] Explain why ResNet's skip connections made 100+ layer nets trainable.
- [ ] Explain transfer learning: when to freeze, when to fine-tune.
- [ ] Explain how a Vision Transformer (ViT) turns an image into tokens.

## 1 · Why not just use an MLP on images?

A 224×224 colour image has $224\cdot224\cdot3\approx150\,000$ numbers. A dense layer with 1000 hidden units on it would need **150 million** weights for one layer, and it would have to learn "a cat in the top-left" and "a cat in the bottom-right" as unrelated patterns. Images have structure an MLP ignores:

- **Locality:** nearby pixels are related; a useful pattern (an edge, an eye) is small.
- **Translation:** the same pattern can appear anywhere.

Convolutional networks (CNNs) build both facts into the architecture.

> [!DEF] Convolution (as used in DL)
> Slide a small **filter** (kernel) $K$ of size $k\times k$ over the image. At each position, multiply the filter with the patch underneath element-wise and sum:
> $$Y[i,j] = \sum_{u=0}^{k-1}\sum_{v=0}^{k-1} K[u,v]\;X[i+u,\,j+v] + b$$
> With $C_{in}$ input channels the filter is $C_{in}\times k\times k$ and the sum also runs over channels. A layer has $C_{out}$ such filters, producing $C_{out}$ output **feature maps**. (Strictly this is cross-correlation; true convolution flips the kernel. With learned kernels the difference doesn't matter.)

> [!EXAMPLE] A vertical-edge detector
> Image patch (left half dark, right half bright) and kernel:
> $$X=\begin{pmatrix}0&0&9\\0&0&9\\0&0&9\end{pmatrix},\quad K=\begin{pmatrix}-1&0&1\\-1&0&1\\-1&0&1\end{pmatrix}\ \Rightarrow\ \sum K\odot X = 27$$
> On a flat region (all 9s) the same kernel gives $0$. The filter "lights up" exactly where there is a vertical edge, wherever it is in the image.

> [!FORMULA] Output size and parameter count
> For input size $n$, kernel $k$, padding $p$, stride $s$:
> $$n_{out} = \Big\lfloor\frac{n+2p-k}{s}\Big\rfloor+1 \qquad \#\text{params} = C_{in}\cdot C_{out}\cdot k^2 + C_{out}$$
> **Padding** adds zeros around the border (with $p=(k-1)/2$ and $s=1$ the size is preserved: "same" padding). **Stride** $s$ moves the filter $s$ pixels at a time, shrinking the output.

> [!EXAMPLE] The skip-test numbers
> Input 32, $k=5$, $s=2$, $p=2$: $\lfloor(32+4-5)/2\rfloor+1 = 15+1 = 16$.
> `Conv2d(64, 128, 3)`: $64\cdot128\cdot9+128 = 73\,856$ parameters, independent of the image size. A dense layer from a $64\times32\times32$ map to a $128\times32\times32$ map would need $65\,536\times131\,072\approx8.6$ **billion** weights.

> [!INTUITION] Physics view
> A convolution is the discrete version of filtering a signal with an impulse response (or a Green's function). The Fourier transform turns it into multiplication, which is why the convolution theorem and FFT-based convolution exist.

> [!VIDEO] KuXjwB4LzSA | But what is a convolution? | 3Blue1Brown · 23 min

## 2 · The properties that make CNNs work

> [!DEF] Weight sharing and translation equivariance
> The **same** filter weights are used at every position (**weight sharing**), which is why the parameter count is tiny. A consequence: if you shift the input, the feature map shifts by the same amount. That is **translation equivariance**: $\text{conv}(\text{shift}(X)) = \text{shift}(\text{conv}(X))$. Pooling and global averaging then make the final prediction approximately **invariant** to small shifts.

> [!DEF] Receptive field
> The **receptive field** of a unit is the region of the input image that can affect it. Each 3×3 conv layer (stride 1) grows it by 2: after $L$ such layers it is $(2L+1)\times(2L+1)$. Strides and pooling make it grow much faster. Deep layers therefore "see" large parts of the image.

> [!DEF] Pooling
> **Max pooling** (e.g. 2×2, stride 2) keeps the largest value in each window; **average pooling** keeps the mean. Both halve the height and width, have no parameters, and add some robustness to small shifts. Modern nets often use strided convolutions instead, and **global average pooling** at the end (average each channel over all positions) before the classifier.

> [!KEY] The feature hierarchy
> Early layers detect edges and colour blobs; middle layers combine them into textures and parts; late layers respond to whole objects. Each stage works at lower resolution but with more channels: a typical shape path is $3\times224\times224 \to 64\times112\times112 \to\dots\to 512\times7\times7$.

> [!EXAMPLE] Two 3×3 convs vs one 5×5
> Two stacked 3×3 convs have a 5×5 receptive field, using $2\cdot9C^2=18C^2$ weights (for $C$ channels in and out) versus $25C^2$ for one 5×5 conv, and they add an extra nonlinearity in between. This is VGG's key insight.

## 3 · Architectures: the ideas that mattered

> [!DEF] Architecture timeline (know the *idea* of each)
> | Year | Model | Key idea |
> |---|---|---|
> | 1998 | LeNet | conv + pool + dense, for digits |
> | 2012 | AlexNet | ReLU, GPUs, dropout: the "ImageNet moment" |
> | 2014 | VGG | only 3×3 convs, stacked deep |
> | 2014 | GoogLeNet / Inception | parallel branches; cheap 1×1 convs to mix channels |
> | 2015 | **ResNet** | residual connections $\mathbf y=\mathbf x+F(\mathbf x)$: 100+ layers train |
> | 2017–19 | MobileNet / EfficientNet | depthwise-separable convs; scale width, depth and resolution together |
> | 2020 | **ViT** | image patches as tokens → a plain transformer |
> | 2022 | ConvNeXt | a CNN modernized with transformer-era design and training tricks |

> [!DEF] Residual block (ResNet)
> $$\mathbf y = \mathrm{ReLU}\big(\mathbf x + F(\mathbf x)\big),\qquad F = \text{conv-BN-ReLU-conv-BN}$$
> Before ResNet, *adding* layers to a deep plain net made even the **training** error worse: optimization, not overfitting, was the problem. With the skip, a block can represent the identity trivially (set $F=0$), and gradients reach early layers through the "+" unchanged. **The most important architecture idea in DL**: transformers use the same trick (module 08).

> [!TRY] [Normalization Explorer](interactive/norm-explorer.html)
> Every ResNet block uses BatchNorm. Highlight which numbers in a $(N, C, H, W)$ batch it averages over, and compare with LayerNorm and GroupNorm.

> [!DEF] 1×1 convolutions and depthwise-separable convolutions
> A **1×1 conv** mixes channels at each pixel without looking at neighbours: a cheap way to change the channel count. A **depthwise-separable** conv splits a normal conv into a per-channel $k\times k$ conv (spatial) followed by a 1×1 conv (channels), cutting cost by roughly a factor of $k^2$. MobileNet and EfficientNet are built from them.

> [!DEF] Vision Transformer (ViT)
> Cut the image into non-overlapping $16\times16$ patches, flatten each one and map it with a linear layer to a $d$-dimensional **token**, add position embeddings (and a learnable `[CLS]` token), then run a standard transformer encoder (module 08). A 224×224 image becomes $14\times14=196$ tokens. ViTs have weaker built-in priors than CNNs, so they need more data or pretraining, but they scale extremely well.

## 4 · Data augmentation and transfer learning

> [!DEF] Data augmentation
> Create new training examples by transforming existing ones in ways that don't change the label: random crops and resizes, horizontal flips, colour jitter, rotation; stronger recipes like **RandAugment**; and mixing methods like **Mixup** (blend two images and their labels) and **CutMix** (paste a patch of one image into another). It is often worth more than any architecture change.

> [!WARN] Augment only the training set
> Evaluate on clean, centre-cropped images. Leaving random augmentation on at test time makes your scores noisy and lower.

> [!DEF] Transfer learning
> Start from a network **pretrained** on a large dataset (ImageNet, or a foundation model), replace its final classification layer (the **head**) with one for your classes, and train on your data.
>
> - **Small dataset (hundreds of images):** freeze the backbone, train only the head (or the last block).
> - **More data / a different domain:** fine-tune everything at a low learning rate (e.g. 10× lower than from scratch), often with a smaller LR for early layers.

> [!WARN] Match the pretraining preprocessing
> Pretrained models expect inputs normalized the way they were trained (for ImageNet: per-channel mean $(0.485, 0.456, 0.406)$ and std $(0.229, 0.224, 0.225)$, at the right resolution). Forgetting this silently costs a lot of accuracy.

> [!CODE] Fine-tuning a pretrained ResNet with torchvision
> ```python
> from torchvision.models import resnet18, ResNet18_Weights
> weights = ResNet18_Weights.DEFAULT
> model = resnet18(weights=weights)
> for p in model.parameters(): p.requires_grad = False   # freeze the backbone
> model.fc = nn.Linear(model.fc.in_features, 5)           # new head for 5 classes (trainable)
> preprocess = weights.transforms()                       # the matching resize + normalization
> ```

## 5 · Beyond classification

> [!DEF] Object detection
> Predict a **bounding box** and a class for every object. **Two-stage** detectors (Faster R-CNN) first propose regions, then classify them. **One-stage** detectors (the YOLO family) predict boxes directly on a grid, which is fast. **DETR** uses a transformer to output a set of boxes directly.

> [!FORMULA] Intersection over union (IoU)
> $$\text{IoU}(A,B) = \frac{\text{area}(A\cap B)}{\text{area}(A\cup B)}$$
> How much a predicted box overlaps the true box (1 = perfect). A detection usually counts as correct if IoU ≥ 0.5. **Non-maximum suppression** removes duplicate boxes that overlap a higher-scoring one.

> [!DEF] Segmentation
> Classify **every pixel**. **U-Net** is an encoder–decoder: the encoder downsamples to capture context, the decoder upsamples back to full resolution, and skip connections carry fine detail across. (U-Nets are also the backbone of many diffusion models, module 10.) **Mask R-CNN** adds a mask per detected object; **SAM** (Segment Anything) segments any object from a click or box prompt.

> [!DEF] Vision foundation models
> Large pretrained models you can download and reuse: **CLIP** (images and text in a shared embedding space; zero-shot classification by comparing an image to text prompts), **DINOv2** (self-supervised features that work well for almost any task), **SAM** (segmentation). Get them from `timm` or Hugging Face.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **06 CNN** deck and drill this chapter's key facts with spaced repetition, then do the practice questions below.

## Practice (answers hidden)

1. Input $64\times64$, conv with $k=3$, $s=1$, $p=1$, then $2\times2$ max pool, then conv with $k=3$, $s=2$, $p=0$. What is the final spatial size?
<details><summary>Answer</summary>

$64 \to 64$ (same padding) $\to 32$ (pool) $\to \lfloor(32-3)/2\rfloor+1 = 14+1 = 15$.
</details>

2. How many parameters does `Conv2d(3, 32, kernel_size=5)` have? And a depthwise-separable version (5×5 depthwise on 3 channels, then 1×1 to 32), ignoring biases?
<details><summary>Answer</summary>

Standard: $3\cdot32\cdot25+32 = 2\,432$. Separable: $3\cdot25 + 3\cdot32 = 75+96 = 171$ weights.
</details>

3. What is the receptive field after five 3×3 convolutions with stride 1?
<details><summary>Answer</summary>

$2\cdot5+1 = 11$, i.e. $11\times11$ pixels.
</details>

4. You have 300 labelled photos of 3 kinds of leaves. What's your plan?
<details><summary>Answer</summary>

Transfer learning: take a pretrained backbone (e.g. ResNet-50 or a DINOv2 ViT), use its preprocessing, freeze it and train a new 3-way head with strong augmentation. Hold out a validation set. If accuracy plateaus, unfreeze the last block (or everything) at a low LR. Training from scratch on 300 images would badly overfit.
</details>

5. Two boxes: $A = [0,0]\text{–}[4,4]$ and $B=[2,2]\text{–}[6,6]$. What is their IoU?
<details><summary>Answer</summary>

Intersection $[2,2]\text{–}[4,4]$ has area 4. Union $=16+16-4=28$. IoU $=4/28\approx0.14$: not a match at the usual 0.5 threshold.
</details>

6. How many tokens does a ViT with $14\times14$ patches produce for a $224\times224$ image (plus `[CLS]`)?
<details><summary>Answer</summary>

$224/14=16$ patches per side, so $16^2=256$ patch tokens + 1 `[CLS]` = 257.
</details>

## Build
1. **ResNet-18 from scratch** on CIFAR-10. Target ≥ 93% with augmentation and a good LR schedule.
2. **Transfer learning:** fine-tune a pretrained model on a small custom dataset (e.g. 5 classes, ~100 photos each). Compare frozen vs full fine-tuning.
3. Visualize filters, feature maps, and a saliency map / Grad-CAM for your model's predictions.
4. Stretch: a small **U-Net** for segmentation (e.g. Oxford-IIIT Pets masks).

## Traps
- Off-by-one shape errors. Print shapes after every block while developing.
- Forgetting ImageNet normalization (mean/std) when using a pretrained model.
- Evaluating with train-time augmentation turned on.

## Go deeper (all optional)
- ⭐ **[Stanford CS231n](https://cs231n.stanford.edu/)**: [course notes](https://cs231n.github.io/) + lecture videos (YouTube) + **assignments 1–2**. A gold standard.
- **[d2l.ai](https://d2l.ai/)** ch. 7–8 (CNNs, modern CNNs) and ch. 14 (computer vision).
- **[CNN Explainer (interactive)](https://poloclub.github.io/cnn-explainer/)**: see a conv net run in your browser.
- **[Feature Visualization (Distill)](https://distill.pub/2017/feature-visualization/)**: what CNN neurons actually detect.
- **[PyTorch Image Models (timm)](https://github.com/huggingface/pytorch-image-models)**: pretrained models for transfer learning.

## Done when
- [ ] ResNet on CIFAR-10 ≥ 93% · [ ] fine-tuned model works on your own photos
