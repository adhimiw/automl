# Supported Dataset Types and ML/DL Methods

## 1. Supported Dataset Types

### 1.1 Structured Data

#### Tabular Data Formats
- **CSV (Comma-Separated Values)**
  - Standard CSV with various delimiters
  - Support for custom column separators
  - Handling of quoted text and escape characters
  - Multi-line field support

- **Excel Files**
  - XLSX format (Excel 2007+)
  - XLS format (Legacy Excel)
  - Support for multiple sheets
  - Named range extraction
  - Formula result handling

- **Database Exports**
  - SQL dumps
  - Database backup formats
  - Query result sets

- **JSON and XML**
  - Nested JSON structures
  - Flattening capabilities for complex hierarchies
  - XML with various schemas
  - Support for namespaces and attributes

- **Parquet and ORC**
  - Columnar storage formats
  - Compression support
  - Schema evolution handling
  - Partitioned data support

- **Fixed-Width Files**
  - Custom column width specifications
  - Header and footer handling
  - Multi-line record support

#### Database Connections
- **Relational Databases**
  - MySQL/MariaDB
  - PostgreSQL
  - SQLite
  - Microsoft SQL Server
  - Oracle Database

- **NoSQL Databases**
  - MongoDB
  - Cassandra
  - Redis
  - Elasticsearch
  - DynamoDB

- **Data Warehouses**
  - Google BigQuery
  - Amazon Redshift
  - Snowflake
  - Azure Synapse

#### API Connections
- **REST APIs**
  - JSON and XML responses
  - Authentication support (Basic, OAuth, API Key)
  - Pagination handling
  - Rate limiting compliance

- **GraphQL**
  - Query construction interface
  - Schema exploration
  - Result transformation

- **SOAP Web Services**
  - WSDL parsing
  - Complex type handling
  - Fault management

### 1.2 Unstructured Data

#### Text Data
- **Plain Text**
  - TXT files
  - Log files
  - Various encodings (UTF-8, UTF-16, etc.)

- **Rich Text**
  - PDF documents with text extraction
  - Word documents
  - HTML/web page content
  - Markdown files

- **Specialized Text Formats**
  - Email archives
  - Chat logs
  - Social media exports
  - Survey responses

#### Image Data
- **Raster Images**
  - JPEG, PNG, TIFF formats
  - Multi-page images
  - Various color spaces
  - Metadata extraction

- **Vector Graphics**
  - SVG files
  - EPS documents
  - PDF vector content

- **Specialized Image Collections**
  - Medical imaging (DICOM)
  - Satellite imagery
  - Microscopy data

#### Audio Data
- **Audio Files**
  - WAV, MP3, FLAC formats
  - Multi-channel audio
  - Various sampling rates and bit depths
  - Metadata extraction

- **Audio Streams**
  - Real-time audio processing
  - Streaming audio sources

#### Video Data
- **Video Files**
  - MP4, AVI, MOV formats
  - Various codecs and containers
  - Frame extraction capabilities
  - Metadata handling

- **Video Streams**
  - Real-time video processing
  - Streaming video sources

### 1.3 Semi-Structured Data

#### Time Series Data
- **Financial Time Series**
  - Stock market data
  - Economic indicators
  - Trading records

- **IoT and Sensor Data**
  - Device telemetry
  - Environmental sensors
  - Industrial equipment monitoring

- **Event Logs**
  - Application logs
  - System event records
  - User activity streams

#### Geographic Data
- **GIS Formats**
  - Shapefiles
  - GeoJSON
  - KML/KMZ
  - TopoJSON

- **Raster Geographic Data**
  - GeoTIFF
  - Digital elevation models
  - Satellite imagery with georeference

- **Location Data**
  - GPS traces
  - Address databases
  - Point of interest collections

#### Network Data
- **Graph Formats**
  - GraphML
  - GEXF
  - Adjacency matrices
  - Edge lists

- **Network Traffic Data**
  - PCAP files
  - NetFlow records
  - Web server logs

### 1.4 Big Data Support

- **Distributed File Systems**
  - Hadoop HDFS integration
  - Cloud storage (S3, GCS, Azure Blob)
  - Distributed processing support

- **Streaming Data**
  - Kafka integration
  - Kinesis support
  - Real-time processing capabilities

- **Data Sampling Techniques**
  - Intelligent sampling for large datasets
  - Progressive loading for visual exploration
  - Distributed computation for full analysis

## 2. Machine Learning Methods

### 2.1 Supervised Learning

#### Classification Algorithms
- **Linear Models**
  - Logistic Regression
  - Linear Discriminant Analysis
  - Support Vector Machines (linear kernel)

- **Tree-Based Methods**
  - Decision Trees
  - Random Forests
  - Gradient Boosting Machines (XGBoost, LightGBM, CatBoost)
  - Extremely Randomized Trees

- **Probabilistic Classifiers**
  - Naive Bayes (Gaussian, Multinomial, Bernoulli)
  - Bayesian Networks

- **Instance-Based Methods**
  - k-Nearest Neighbors
  - Radius-Based Neighbors
  - Learning Vector Quantization

- **Neural Network Classifiers**
  - Multi-layer Perceptron
  - Radial Basis Function Networks

#### Regression Algorithms
- **Linear Models**
  - Linear Regression
  - Ridge Regression
  - Lasso Regression
  - Elastic Net
  - Polynomial Regression

- **Tree-Based Regression**
  - Decision Tree Regressor
  - Random Forest Regressor
  - Gradient Boosting Regressors

- **Support Vector Regression**
  - Linear SVR
  - Non-linear SVR (various kernels)

- **Instance-Based Regression**
  - k-Nearest Neighbors Regressor
  - Radius Neighbors Regressor

- **Neural Network Regression**
  - MLP Regressor
  - Specialized regression networks

#### Specialized Supervised Methods
- **Ordinal Regression**
  - Proportional Odds Models
  - Neural approaches for ordinal targets

- **Multi-output Regression**
  - Multi-target regression trees
  - Multi-output neural networks

- **Quantile Regression**
  - Linear quantile regression
  - Quantile regression forests

- **Survival Analysis**
  - Cox Proportional Hazards
  - Survival trees and forests
  - Accelerated failure time models

### 2.2 Unsupervised Learning

#### Clustering Algorithms
- **Centroid-Based Clustering**
  - K-Means
  - K-Medoids
  - Mean Shift

- **Hierarchical Clustering**
  - Agglomerative clustering
  - Divisive clustering
  - BIRCH

- **Density-Based Clustering**
  - DBSCAN
  - OPTICS
  - HDBSCAN

- **Distribution-Based Clustering**
  - Gaussian Mixture Models
  - Bayesian Gaussian Mixture Models

- **Spectral Clustering**
  - Normalized cuts
  - Spectral embedding approaches

#### Dimensionality Reduction
- **Linear Methods**
  - Principal Component Analysis (PCA)
  - Linear Discriminant Analysis (LDA)
  - Factor Analysis
  - Independent Component Analysis (ICA)

- **Manifold Learning**
  - t-SNE
  - UMAP
  - Isomap
  - Locally Linear Embedding
  - Spectral Embedding

- **Matrix Factorization**
  - Non-negative Matrix Factorization
  - Truncated SVD
  - Dictionary Learning

#### Anomaly Detection
- **Statistical Methods**
  - Z-score
  - Modified Z-score
  - Grubbs test
  - ESD test

- **Proximity-Based Methods**
  - Local Outlier Factor
  - Isolation Forest
  - One-class SVM

- **Density-Based Methods**
  - DBSCAN-based outlier detection
  - KNN-based outlier scores

- **Reconstruction-Based Methods**
  - PCA reconstruction error
  - Autoencoder reconstruction error

### 2.3 Semi-Supervised Learning

- **Self-Training Methods**
  - Pseudo-labeling
  - Confidence-based label propagation

- **Graph-Based Methods**
  - Label propagation
  - Label spreading
  - Semi-supervised embedding

- **Generative Approaches**
  - Semi-supervised VAEs
  - Ladder networks

### 2.4 Reinforcement Learning

- **Value-Based Methods**
  - Q-Learning
  - Deep Q-Networks (DQN)
  - State-Action-Reward-State-Action (SARSA)

- **Policy-Based Methods**
  - Policy Gradients
  - Actor-Critic Methods
  - Proximal Policy Optimization (PPO)

- **Model-Based Methods**
  - Dynamic Programming
  - Monte Carlo Tree Search
  - Dyna-Q

### 2.5 Ensemble Methods

- **Bagging Methods**
  - Random Forests
  - Bagged Decision Trees
  - Extra Trees

- **Boosting Methods**
  - AdaBoost
  - Gradient Boosting
  - XGBoost
  - LightGBM
  - CatBoost

- **Stacking Methods**
  - Stacked Generalization
  - Blending
  - Multi-level stacking

- **Voting Methods**
  - Hard Voting
  - Soft Voting
  - Weighted Voting

## 3. Deep Learning Methods

### 3.1 Neural Network Architectures

#### Feedforward Networks
- **Multi-layer Perceptron (MLP)**
  - Various activation functions
  - Dropout regularization
  - Batch normalization
  - Skip connections

- **Deep Belief Networks**
  - Restricted Boltzmann Machines
  - Layer-wise pretraining

#### Convolutional Neural Networks
- **Standard CNN Architectures**
  - LeNet
  - AlexNet
  - VGGNet
  - ResNet
  - Inception/GoogLeNet
  - DenseNet
  - EfficientNet

- **Specialized CNN Components**
  - Depthwise separable convolutions
  - Dilated convolutions
  - Attention mechanisms in CNNs
  - Spatial transformer networks

#### Recurrent Neural Networks
- **Standard RNN Architectures**
  - Simple RNN
  - Long Short-Term Memory (LSTM)
  - Gated Recurrent Unit (GRU)
  - Bidirectional RNNs

- **Advanced RNN Variants**
  - Attention-based RNNs
  - Memory networks
  - Neural Turing Machines

#### Transformer Architectures
- **Standard Transformer Models**
  - Encoder-only (BERT-like)
  - Decoder-only (GPT-like)
  - Encoder-decoder (T5-like)

- **Transformer Variants**
  - Transformer-XL
  - Reformer
  - Linformer
  - Performer
  - Longformer

#### Autoencoders
- **Standard Autoencoders**
  - Undercomplete autoencoders
  - Sparse autoencoders
  - Denoising autoencoders

- **Variational Autoencoders (VAEs)**
  - Standard VAEs
  - Conditional VAEs
  - Beta-VAEs

- **Specialized Autoencoder Architectures**
  - Contractive autoencoders
  - Adversarial autoencoders
  - VQ-VAEs

#### Generative Adversarial Networks
- **Standard GAN Architectures**
  - Vanilla GAN
  - Deep Convolutional GAN (DCGAN)
  - Wasserstein GAN
  - Conditional GAN

- **Advanced GAN Variants**
  - CycleGAN
  - StyleGAN
  - BigGAN
  - Progressive GAN

### 3.2 Deep Learning for Computer Vision

- **Image Classification**
  - Single-label classification
  - Multi-label classification
  - Fine-grained classification

- **Object Detection**
  - Region-based methods (R-CNN family)
  - Single-shot detectors (SSD, YOLO)
  - Anchor-free detectors

- **Semantic Segmentation**
  - Fully Convolutional Networks
  - U-Net
  - DeepLab
  - PSPNet

- **Instance Segmentation**
  - Mask R-CNN
  - YOLACT
  - PointRend

- **Pose Estimation**
  - OpenPose
  - HRNet
  - DensePose

- **Image Generation and Manipulation**
  - Style transfer
  - Super-resolution
  - Image-to-image translation
  - Inpainting

### 3.3 Deep Learning for Natural Language Processing

- **Word Embeddings**
  - Word2Vec
  - GloVe
  - FastText
  - Contextual embeddings

- **Text Classification**
  - Sentiment analysis
  - Topic classification
  - Intent recognition

- **Sequence Labeling**
  - Named Entity Recognition
  - Part-of-speech tagging
  - Chunking

- **Machine Translation**
  - Sequence-to-sequence models
  - Transformer-based translation
  - Multilingual translation

- **Text Generation**
  - Language modeling
  - Text summarization
  - Question answering
  - Dialogue systems

- **Information Extraction**
  - Relation extraction
  - Event extraction
  - Coreference resolution

### 3.4 Deep Learning for Time Series

- **Forecasting Models**
  - RNN-based forecasting
  - Temporal convolutional networks
  - Transformer-based forecasting
  - N-BEATS

- **Anomaly Detection**
  - Autoencoder-based detection
  - Predictive models for anomaly scoring
  - Sequence models for pattern deviation

- **Classification and Segmentation**
  - Time series classification
  - Change point detection
  - Temporal segmentation

### 3.5 Deep Learning for Graphs

- **Graph Neural Networks**
  - Graph Convolutional Networks
  - GraphSAGE
  - Graph Attention Networks
  - Message Passing Neural Networks

- **Graph Applications**
  - Node classification
  - Link prediction
  - Graph classification
  - Community detection

### 3.6 Deep Reinforcement Learning

- **Value-Based Methods**
  - Deep Q-Networks (DQN)
  - Double DQN
  - Dueling DQN
  - Rainbow DQN

- **Policy Gradient Methods**
  - REINFORCE
  - Advantage Actor-Critic (A2C)
  - Proximal Policy Optimization (PPO)
  - Trust Region Policy Optimization (TRPO)

- **Model-Based RL**
  - World models
  - MuZero
  - Dreamer

## 4. Feature Engineering Methods

### 4.1 Numerical Feature Transformations

- **Scaling Methods**
  - Min-Max scaling
  - Standardization (Z-score)
  - Robust scaling
  - Quantile transformation

- **Non-linear Transformations**
  - Log transformation
  - Box-Cox transformation
  - Yeo-Johnson transformation
  - Power transformation

- **Binning Methods**
  - Equal-width binning
  - Equal-frequency binning
  - K-means binning
  - Decision tree-based binning

### 4.2 Categorical Feature Encoding

- **Nominal Encoding**
  - One-hot encoding
  - Dummy encoding
  - Effect coding
  - Binary encoding

- **Ordinal Encoding**
  - Label encoding
  - Target encoding
  - Weight of evidence encoding
  - James-Stein encoding

- **High-Cardinality Handling**
  - Feature hashing
  - Bin counting
  - Rare category grouping
  - Embedding methods

### 4.3 Text Feature Engineering

- **Bag-of-Words Approaches**
  - Count vectorization
  - TF-IDF vectorization
  - N-gram extraction
  - BM25

- **Word Embeddings**
  - Pre-trained embeddings (Word2Vec, GloVe)
  - Custom trained embeddings
  - Document embeddings

- **Advanced NLP Features**
  - Named entity features
  - Part-of-speech features
  - Syntactic features
  - Topic modeling features

### 4.4 Time Series Feature Engineering

- **Lag Features**
  - Simple lags
  - Moving averages
  - Exponential smoothing
  - Differencing

- **Window Features**
  - Statistical window features
  - Fourier transforms
  - Wavelet transforms
  - Tsfresh feature extraction

- **Calendar Features**
  - Date components
  - Holiday indicators
  - Cyclical encodings
  - Season indicators

### 4.5 Image Feature Engineering

- **Traditional Computer Vision Features**
  - SIFT
  - HOG
  - SURF
  - LBP

- **Deep Learning Features**
  - Pre-trained CNN features
  - Custom CNN feature extractors
  - Self-supervised features

### 4.6 Automated Feature Engineering

- **Feature Selection Methods**
  - Filter methods
  - Wrapper methods
  - Embedded methods
  - Genetic algorithms

- **Feature Generation**
  - Polynomial features
  - Interaction terms
  - Feature crosses
  - Automated feature synthesis

## 5. Model Evaluation and Validation

### 5.1 Performance Metrics

#### Classification Metrics
- **Binary Classification**
  - Accuracy
  - Precision, Recall, F1-score
  - ROC AUC, PR AUC
  - Log loss
  - Matthews correlation coefficient

- **Multi-class Classification**
  - Macro/micro/weighted averages
  - Cohen's kappa
  - Confusion matrix
  - Multi-class log loss

#### Regression Metrics
- **Error Metrics**
  - Mean Absolute Error (MAE)
  - Mean Squared Error (MSE)
  - Root Mean Squared Error (RMSE)
  - Mean Absolute Percentage Error (MAPE)

- **Correlation Metrics**
  - R-squared
  - Adjusted R-squared
  - Explained variance
  - Pearson/Spearman correlation

#### Ranking Metrics
- **Ranking Quality**
  - Mean Reciprocal Rank
  - Normalized Discounted Cumulative Gain
  - Mean Average Precision
  - Kendall's Tau

#### Clustering Metrics
- **Internal Metrics**
  - Silhouette coefficient
  - Davies-Bouldin index
  - Calinski-Harabasz index
  - Inertia

- **External Metrics**
  - Adjusted Rand index
  - Mutual information
  - Homogeneity, completeness, V-measure
  - Fowlkes-Mallows index

### 5.2 Validation Strategies

- **Cross-Validation Techniques**
  - K-fold cross-validation
  - Stratified K-fold
  - Leave-one-out cross-validation
  - Group K-fold
  - Time series cross-validation

- **Train-Test Splitting**
  - Random splitting
  - Stratified splitting
  - Time-based splitting
  - Group-based splitting

- **Bootstrapping**
  - Out-of-bag estimation
  - Bootstrap confidence intervals
  - .632+ bootstrap

### 5.3 Model Interpretation

- **Feature Importance**
  - Permutation importance
  - SHAP values
  - Partial dependence plots
  - Individual conditional expectation plots

- **Model-Specific Interpretations**
  - Decision tree visualization
  - Linear model coefficients
  - Attention weights visualization
  - Activation maximization

- **Global Interpretation**
  - Global surrogate models
  - Feature interaction analysis
  - Accumulated local effects
  - Variable importance plots

- **Local Interpretation**
  - LIME
  - SHAP
  - Counterfactual explanations
  - Anchors

## 6. Hyperparameter Optimization

### 6.1 Search Strategies

- **Grid Search**
  - Exhaustive search
  - Reduced grid search

- **Random Search**
  - Pure random search
  - Sobol sequences
  - Latin hypercube sampling

- **Bayesian Optimization**
  - Gaussian processes
  - Tree-structured Parzen estimators
  - Sequential model-based optimization

- **Evolutionary Algorithms**
  - Genetic algorithms
  - Particle swarm optimization
  - Differential evolution

### 6.2 Early Stopping Strategies

- **Performance-Based**
  - Validation loss plateau detection
  - Validation metric improvement threshold
  - Consecutive iteration monitoring

- **Resource-Based**
  - Time budget allocation
  - Computation budget allocation
  - Successive halving

### 6.3 Multi-Objective Optimization

- **Pareto Optimization**
  - Non-dominated sorting
  - Hypervolume indicators
  - Reference point methods

- **Scalarization Methods**
  - Weighted sum
  - Epsilon constraint
  - Achievement scalarizing functions

## 7. Specialized Methods

### 7.1 Imbalanced Learning

- **Sampling Techniques**
  - Random oversampling
  - Random undersampling
  - SMOTE and variants
  - Tomek links
  - ADASYN

- **Algorithm Modifications**
  - Cost-sensitive learning
  - Class weight adjustment
  - Threshold moving
  - Ensemble methods for imbalance

### 7.2 Multi-label Learning

- **Problem Transformation**
  - Binary relevance
  - Classifier chains
  - Label powerset
  - Random k-labelsets

- **Algorithm Adaptation**
  - Multi-label decision trees
  - Multi-label neural networks
  - Multi-label kNN

### 7.3 Multi-task Learning

- **Hard Parameter Sharing**
  - Shared base layers
  - Task-specific output layers

- **Soft Parameter Sharing**
  - Regularization-based sharing
  - Cross-stitch networks
  - Sluice networks

### 7.4 Transfer Learning

- **Fine-tuning Approaches**
  - Full fine-tuning
  - Feature extraction
  - Progressive fine-tuning
  - Adapter-based fine-tuning

- **Domain Adaptation**
  - Adversarial domain adaptation
  - Correlation alignment
  - Domain-invariant feature learning

### 7.5 Active Learning

- **Query Strategies**
  - Uncertainty sampling
  - Query-by-committee
  - Expected model change
  - Expected error reduction
  - Diversity sampling

- **Batch Selection**
  - Greedy batch selection
  - Diversity-aware batch selection
  - Submodular function optimization

### 7.6 Online Learning

- **Online Algorithms**
  - Online gradient descent
  - Follow the regularized leader
  - Online passive-aggressive algorithms

- **Concept Drift Handling**
  - Drift detection methods
  - Adaptive windowing
  - Ensemble approaches for drift

## 8. Integration with Gemini API

### 8.1 Natural Language Understanding

- **Query Understanding**
  - Intent recognition
  - Entity extraction
  - Query reformulation
  - Context tracking

- **Data Description Generation**
  - Automated dataset summaries
  - Feature descriptions
  - Pattern explanations
  - Insight narratives

### 8.2 Code Generation

- **Feature Engineering Code**
  - Custom transformation code
  - Data cleaning scripts
  - Feature extraction pipelines

- **Model Building Code**
  - Custom model architectures
  - Training loop implementation
  - Evaluation script generation

### 8.3 Explanation Generation

- **Concept Explanations**
  - Algorithm principles
  - Statistical concept descriptions
  - Mathematical foundation explanations
  - Visual concept illustrations

- **Result Interpretations**
  - Performance metric explanations
  - Model behavior analysis
  - Prediction justifications
  - Comparative analysis narratives

### 8.4 Learning Content Generation

- **Tutorial Generation**
  - Personalized learning materials
  - Step-by-step guides
  - Interactive exercises
  - Knowledge checks

- **Documentation Assistance**
  - Project documentation
  - Model cards
  - Dataset documentation
  - Process documentation
