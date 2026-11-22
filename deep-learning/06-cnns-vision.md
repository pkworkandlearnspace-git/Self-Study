# 06 · CNNs & Computer Vision
> **Goal:** understand convolution, the classic architectures, and modern vision. · **Time:** 20–25 h · **Needs:** 05

## Skip test
- [ ] Compute the output size of a conv: input 32, kernel 5, stride 2, padding 2.
- [ ] Count the parameters of `Conv2d(64, 128, kernel_size=3)` and explain why it's tiny next to a dense layer.
- [ ] Explain **translation equivariance**, **weight sharing**, and **receptive field**.
- [ ] Explain why ResNet's skip connections made 100+ layer nets trainable.
- [ ] Explain transfer learning: when to freeze, when to fine-tune.
- [ ] Explain how a Vision Transformer (ViT) turns an image into tokens.

## Core ideas
- **Convolution** = sliding the same small filter everywhere. This builds in the *prior* that local patterns matter anywhere in the image.
  - Output size: $\lfloor (n + 2p - k)/s \rfloor + 1$. Params: $C_{in}\cdot C_{out}\cdot k^2 + C_{out}$.
  - 🔭 A convolution is the discrete version of what you know from Green's functions and signal filtering. In DL it's technically cross-correlation.
- **Pooling / strided conv** downsample, so the receptive field grows. **Feature hierarchy:** edges → textures → parts → objects.
- **Architecture timeline (know the *idea* of each):**
  - **LeNet** (1998): conv + pool. **AlexNet** (2012): ReLU, GPU, dropout, the "ImageNet moment".
  - **VGG**: stacks of 3×3 convs. **GoogLeNet/Inception**: parallel branches, 1×1 convs.
  - **ResNet** (2015): $\mathbf y = \mathbf x + F(\mathbf x)$. **The most important architecture idea in DL.**
  - **MobileNet/EfficientNet**: depthwise-separable convs, compound scaling.
  - **ConvNeXt** (2022): a CNN modernized with transformer-era training tricks.
  - **ViT** (2020): split the image into 16×16 patches → linear embeddings → transformer. Wins with enough data or pretraining.
- **Data augmentation:** flips, crops, color jitter, Mixup/CutMix, RandAugment. Often worth more than architecture changes.
- **Transfer learning:** take an ImageNet-pretrained backbone and replace the head. Small data → freeze most layers. More data → fine-tune all at a low LR.
- **Tasks beyond classification:**
  - **Detection** (boxes): two-stage (Faster R-CNN), one-stage (YOLO family), transformer-based (DETR).
  - **Segmentation** (pixels): **U-Net** (encoder-decoder + skip connections, also the backbone of diffusion models!), Mask R-CNN, SAM.
- **Foundation vision models:** CLIP (image–text), DINOv2 (self-supervised features), SAM (segment anything). Grab them from `timm` / Hugging Face.

## Learn from
- ⭐ **[Stanford CS231n](https://cs231n.stanford.edu/)**: [course notes](https://cs231n.github.io/) + lecture videos (YouTube) + **assignments 1–2**. A gold standard.
- **d2l.ai** ch. 7–8 (CNNs, modern CNNs) and ch. 14 (computer vision).
- **[CNN Explainer (interactive)](https://poloclub.github.io/cnn-explainer/)**: see a conv net run in your browser.
- **[Feature Visualization (Distill)](https://distill.pub/2017/feature-visualization/)**: what CNN neurons actually detect.
- **[PyTorch Image Models (timm)](https://github.com/huggingface/pytorch-image-models)**: pretrained models for transfer learning.

## Build
1. **ResNet-18 from scratch** on CIFAR-10. Target ≥ 93% with augmentation and a good LR schedule.
2. **Transfer learning:** fine-tune a pretrained model on a small custom dataset (e.g. 5 classes, ~100 photos each). Compare frozen vs full fine-tuning.
3. Visualize filters, feature maps, and a saliency map / Grad-CAM for your model's predictions.
4. Stretch: a small **U-Net** for segmentation (e.g. Oxford-IIIT Pets masks).

## Traps
- Off-by-one shape errors. Print shapes after every block while developing.
- Forgetting ImageNet normalization (mean/std) when using a pretrained model.
- Evaluating with train-time augmentation turned on.

## Done when
- [ ] ResNet on CIFAR-10 ≥ 93% · [ ] fine-tuned model works on your own photos
